import jwt from 'jwt-simple';
import shortid from 'shortid';

import User from '../models/User';
import constants, {clientUrl, supportEmail} from '../config/constants';
import {verificationMail, sendMail} from "../mails";
import UserCircle from "../models/UserCircle"
import Account from "../models/Account"
import Invite from "../models/Invite"
import Alim from "../models/Alim"
import AlimCircle from "../models/AlimCircle"
import {invitationAccepted} from "../mails/invite"
import Setting from "../models/Setting"

export const tokenForAccount = account => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: account._id, iat: timestamp }, constants.JWT_SECRET);
}

export const getMe = async (req, res) => {
  try {
    const decoded = jwt.decode(req.body.jwt, constants.JWT_SECRET);
    console.log('DECODED: ', decoded);
    const account = await Account.findById(decoded.sub)
      .populate('user alim settings')
      .select('-password -otp -createdAt -updatedAt -__v').exec();
    res.json({ account });
    console.log('ACCOUNT: ', account);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const ping = (req, res) => {
  res.json({ message: 'Its working!' });
}

// export const login = async (req, res, next) => {
//   let { password, ...account } = req.account._doc; // req.account is been inserted by passport
//   res.send({ jwt: tokenForAccount(req.account._doc), account });
// }

export const login = async (req, res, next) => {
  try {
    const {email, password } = req.body;
    let accountDoc = await Account.findOne({ email })
      .populate('alim user')
      .exec();
    if (!accountDoc) throw "User not found! If first time then Register";
    // if (!accountDoc.confirmed) throw 'Email not confirmed yet';

    const isMatch = await accountDoc.comparePassword(password);
    if (!isMatch) throw 'Incorrect password.'
    const { password: pass, ...account } = accountDoc._doc

    res.json({ account, jwt: tokenForAccount(account) })

  } catch (error) {
    res.status(422).send({ error });
  }
}

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, fullName, maslak, dob, gender } = req.body;

    let missingField;
    if (!email) missingField = 'Email';
    else if (!password) missingField = 'Password';
    else if (!fullName) missingField = 'Full name';
    else if (!maslak) missingField = 'Maslak';
    else if (!dob) missingField = 'Date of birth';
    else if (!gender) missingField = 'Gender';

    if (missingField) {
      throw `${missingField} is required`;
    }

    const existingAccount = await Account.findOne({ email }).exec();
    if (existingAccount) throw 'Email already exists';

    const account = await new Account({ email, password }).save();
    const user = await new User({ account: account._id, fullName, maslak, dob, gender }).save();
    const circle = await new UserCircle({ account: account._id, user: user._id }).save();
    const settings = await new Setting({ account: account._id }).save();

    await account.update({ user: user._id, settings: settings._id }).exec();
    await user.update({ circle: circle._id }).exec();

    let jwt = tokenForAccount(account);
    verificationMail({ fullName, email, jwt });
    res.json({ fullName, email, jwt })
  } catch (err) {
    return next(err)
  }
}

export const registerAlim = async (req, res) => {
  try {
    const { email, password, maslak, fullName, dob, gender, inviteId, level } = req.body;

    let missingField;
    if (!email) missingField = 'Email';
    else if (!inviteId && !maslak) missingField = "Maslak";
    else if (!password) missingField = 'Password';
    else if (!fullName) missingField = 'Full name';
    else if (!dob) missingField = 'Date of birth';
    else if (!gender) missingField = 'Gender';

    if (missingField) {
      throw `${missingField} is required`;
    }

    let invite;
    if (inviteId) {
      invite = await Invite.findOne({ _id: inviteId }).populate('account').exec();
      if (!invite) throw "Invalid invite";
      if (invite.acceptedBy) throw "Invitation expired"
    }

    const existingAccount = await Account.findOne({ email }).exec();
    if (existingAccount) throw 'Email already exists';

    const account = await new Account({
      email, password,
      isAlim: true,
      isSenior: invite ? invite.isSenior : false,
      authorizationToPost: invite ? (invite.authorizationToPost || invite.authorizationToAnswer) : false,
      authorizationToAnswer: invite ? invite.authorizationToAnswer : false
    }).save();

    const alim = await new Alim({
      account: account._id,
      fullName,
      maslak: invite ? invite.maslak : maslak,
      dob, gender, level
    }).save();

    const circle = await new AlimCircle({ account: account._id, alim: alim._id }).save();
    const settings = await new Setting({ account: account._id }).save();

    await account.update({ alim: alim._id, settings: settings._id }).exec()
    await alim.update({ circle: circle._id }).exec()

    let jwt = tokenForAccount(account);
    verificationMail({ fullName, email, jwt });

    if (invite) {
      await invite.update({ acceptedBy: alim._id }).exec()
      invitationAccepted(invite.account.email, invite.name)
    }

    res.json({ fullName, email, jwt })

  } catch (error) {
    res.status(422).send({ error });
  }
}

export const confirmEmail = async (req, res) => {
  try {
    const decoded = jwt.decode(req.params.jwt, constants.JWT_SECRET);
    const account = await Account.findById(decoded.sub).select('email confirmed').exec();
    await account.update({ confirmed: true });
    res.redirect(`${clientUrl}/auth/email-verified?email=${account.email}`)
  } catch (error) {
    res.redirect(`${clientUrl}/auth/email-error`)
  }
}

export const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const account = await Account.findOne({ email }).populate('user alim').exec()
    if (!account) throw `No account found with email ${email}`
    if (account.confirmed) throw `Account with email ${email} is already verified`

    let jwt = tokenForAccount(account);
    let fullName = account.isAlim ? account.alim.fullName : account.user.fullName;
    verificationMail({ fullName, email, jwt });
    res.json({ fullName, email, jwt })
  } catch (err) {
    return next(err)
  }
}

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const account = await Account.findOne({ email }).exec();

    if (account) {
      let jwt = tokenForAccount(account);
      let link = `${clientUrl}/auth/reset?token=${jwt}`
      let subject = 'Password reset confirmation';
      let mailContent = {
        title: 'Confirm Password Reset!',
        hiddenMessage: subject,
        body: `
        <div>
            <p>We have received a request to reset your password. If this was you then press the button below.</p>
            <p>This link will expire in 30 minutes.</p>
            <div style="margin: 15px auto; text-align: center;">
               <a href="${link}" target="_blank" style="font-size: 20px; font-family: 'Rubik', Helvetica, Arial, sans-serif; color: #000; text-decoration: none; padding: 15px 25px; border-radius: 2px; background-color: #fc0; display: inline-block;">Confirm Password Reset</a>
            </div>
            <p>If this was not you, please contact us immediately from <a href="mailto:${supportEmail}">${supportEmail}</a> - so we can look into it.</p>
        </div>`
      }
      sendMail({ email, subject, mailContent });
    }

    res.json({message: `Password reset confirmation mail sent to ${email}`})
  } catch (error) {
    res.json({message: `Something went wrong while requesting password reset`, error })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    const decoded = jwt.decode(token, constants.JWT_SECRET);
    const tokenExpired = 30 < Math.floor(((Date.now() - decoded.iat) / 1000) / 60)
    if (tokenExpired) throw "Password link expired"
    const account = await Account.findById(decoded.sub).select('password').exec();
    await account.update({ password: account._hashPassword(password) });
    res.json({message: `Password reset successfully`})
  } catch (error) {
    res.json({message: `Something went wrong while resetting the password`, error })
  }
}


export const forgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw "Please provide the email address"
    const user = await User.findOne({ email }).exec();

    if (user) {
      let otp = shortid.generate();
      await user.update({ otp: { text: otp, createdOn: Date.now() }})
      let subject = 'Password Reset OTP';
      let mailContent = {
        title: 'Password Reset OTP!',
        hiddenMessage: subject,
        body: `
        <div>
            <p>We have received a request to reset your password. Enter this OTP to proceed.</p>
            <p>This OTP will expire in 15 minutes.</p>
            <div style="margin: 15px auto; text-align: center;">
               <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; font-family: 'Rubik', Helvetica, Arial, sans-serif; color: #fff; text-decoration: none; padding: 15px 25px; background-color: #333; display: inline-block;">
                 ${otp}
                </p>
            </div>
            <p>If this was not you, please contact us immediately from <a href="mailto:support@alimbook.com">support@alimbook.com</a> - so we can look into it.</p>
        </div>`
      }
      sendMail({ email, subject, mailContent });
    }

    res.json({message: `Password reset OTP sent to ${email}`})
  } catch (error) {
    res.json({message: `Something went wrong while sending password reset OTP`, error })
  }
}

export const resetPasswordOTP = async (req, res) => {
  try {
    const { password, otp } = req.body;
    if (!password || !otp) throw "Incomplete parameters";
    const [user] = await User.find({ "otp.text": otp }).exec();
    if (!user) throw "Invalid OTP";
    if (!user.otp) throw "OTP not generated yet";
    const otpExpired = 15 < Math.floor(((Date.now() - new Date(user.otp.createdOn)) / 1000) / 60)
    if (otpExpired) throw "OTP expired"
    await user.update({ password: user._hashPassword(password), otp: {} });
    res.json({message: `Password reset successfully`})
  } catch (error) {
    res.json({message: `Something went wrong while resetting the password`, error })
  }
}

export const checkMobile = async (req, res) => {
  try {
    let user = await User.findOne({ mobile: req.query.mobile }).exec()
    let taken = user !== null;
    res.json({ taken })
  } catch (error) {
    res.send({ error })
  }
}

export const checkEmail = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.query.email }).exec()
    let taken = user !== null;
    res.json({ taken })
  } catch (error) {
    res.send({ error })
  }
}
