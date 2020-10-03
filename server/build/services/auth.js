'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEmail = exports.checkMobile = exports.resetPasswordOTP = exports.forgotPasswordOTP = exports.resetPassword = exports.requestPasswordReset = exports.resendEmail = exports.confirmEmail = exports.registerAlim = exports.registerUser = exports.login = exports.getMe = exports.tokenForAccount = undefined;

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _constants = require('../config/constants');

var _constants2 = _interopRequireDefault(_constants);

var _mails = require('../mails');

var _UserCircle = require('../models/UserCircle');

var _UserCircle2 = _interopRequireDefault(_UserCircle);

var _Account = require('../models/Account');

var _Account2 = _interopRequireDefault(_Account);

var _Invite = require('../models/Invite');

var _Invite2 = _interopRequireDefault(_Invite);

var _Alim = require('../models/Alim');

var _Alim2 = _interopRequireDefault(_Alim);

var _AlimCircle = require('../models/AlimCircle');

var _AlimCircle2 = _interopRequireDefault(_AlimCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const tokenForAccount = exports.tokenForAccount = account => {
  const timestamp = new Date().getTime();
  return _jwtSimple2.default.encode({ sub: account._id, iat: timestamp }, _constants2.default.JWT_SECRET);
};

const getMe = exports.getMe = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const decoded = _jwtSimple2.default.decode(req.body.jwt, _constants2.default.JWT_SECRET);
      const account = yield _Account2.default.findById(decoded.sub).populate('user alim').select('-password -otp -createdAt -updatedAt -__v').exec();
      res.json({ account });
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getMe(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const login = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    let _req$account$_doc = req.account._doc,
        { password } = _req$account$_doc,
        account = _objectWithoutProperties(_req$account$_doc, ['password']); // req.account is been inserted by passport
    res.send({ jwt: tokenForAccount(req.account._doc), account });
  });

  return function login(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

exports.login = login;
const registerUser = exports.registerUser = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      const { email, password, fullName } = req.body;
      if (!email || !password) {
        let missingField;
        if (!email) missingField = 'Email';else if (!password) missingField = 'Password';
        throw `${missingField} is required`;
      }

      const existingAccount = yield _Account2.default.findOne({ email }).exec();
      if (existingAccount) throw 'Email already exists';

      const account = yield new _Account2.default({ email, password }).save();
      const user = yield new _User2.default({ account: account._id, fullName }).save();
      const circle = yield new _UserCircle2.default({ account: account._id, user: user._id }).save();

      yield account.update({ user: user._id }).exec();
      yield user.update({ circle: circle._id }).exec();

      let jwt = tokenForAccount(account);
      (0, _mails.verificationMail)({ fullName, email, jwt });
      res.json({ fullName, email, jwt });
    } catch (err) {
      return next(err);
    }
  });

  return function registerUser(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})();

const registerAlim = exports.registerAlim = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      const { email, password, fullName, maslak, dob, gender, inviteId } = req.body;

      if (!inviteId || !email || !password || !fullName || !maslak || !dob || !gender) {

        let missingField;
        if (!inviteId) missingField = 'InviteId';else if (!email) missingField = 'Email';else if (!password) missingField = 'Password';else if (!fullName) missingField = 'Full name';else if (!maslak) missingField = 'Maslak';else if (!dob) missingField = 'Date of birth';else if (!gender) missingField = 'Gender';

        throw `${missingField} is required`;
      }

      const invite = yield _Invite2.default.findOne({ _id: inviteId }).exec();

      if (!invite) throw "Invalid invite";
      if (invite.acceptedBy) throw "Invitation expired";

      const existingAccount = yield _Account2.default.findOne({ email }).exec();
      if (existingAccount) throw 'Email already exists';

      const account = yield new _Account2.default({ email, password, isAlim: true }).save();
      const alim = yield new _Alim2.default({ account: account._id, fullName, maslak, dob, gender }).save();
      const circle = yield new _AlimCircle2.default({ account: account._id, alim: alim._id }).save();

      yield account.update({ alim: alim._id }).exec();
      yield alim.update({ circle: circle._id }).exec();
      yield invite.update({ acceptedBy: alim._id }).exec();

      let jwt = tokenForAccount(account);
      (0, _mails.alimVerificationMail)({ fullName, email, jwt });

      res.json({ fullName, email, jwt });
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function registerAlim(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
})();

const confirmEmail = exports.confirmEmail = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      const decoded = _jwtSimple2.default.decode(req.params.jwt, _constants2.default.JWT_SECRET);
      const account = yield _Account2.default.findById(decoded.sub).select('email confirmed').exec();
      yield account.update({ confirmed: true });
      res.redirect(`/auth/email-verified?email=${account.email}`);
    } catch (error) {
      res.redirect('/auth/email-error');
    }
  });

  return function confirmEmail(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
})();

const resendEmail = exports.resendEmail = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
    try {
      const { email } = req.body;
      const account = yield _Account2.default.findOne({ email }).populate('user alim').exec();
      if (!account) throw `No account found with email ${email}`;
      if (account.confirmed) throw `Account with email ${email} is already verified`;

      let jwt = tokenForAccount(account);
      let fullName = account.isAlim ? account.alim.fullName : account.user.fullName;
      (0, _mails.verificationMail)({ fullName, email, jwt });
      res.json({ fullName, email, jwt });
    } catch (err) {
      return next(err);
    }
  });

  return function resendEmail(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
})();

const requestPasswordReset = exports.requestPasswordReset = (() => {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      const { email } = req.body;
      const account = yield _Account2.default.findOne({ email }).exec();

      if (account) {
        let jwt = tokenForAccount(account);
        let link = `https://www.alimbook.com/auth/reset?token=${jwt}`;
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
            <p>If this was not you, please contact us immediately from <a href="mailto:${_constants.supportEmail}">${_constants.supportEmail}</a> - so we can look into it.</p>
        </div>`
        };
        (0, _mails.sendMail)({ email, subject, mailContent });
      }

      res.json({ message: `Password reset confirmation mail sent to ${email}` });
    } catch (error) {
      res.json({ message: `Something went wrong while requesting password reset`, error });
    }
  });

  return function requestPasswordReset(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
})();

const resetPassword = exports.resetPassword = (() => {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      const { password, token } = req.body;
      const decoded = _jwtSimple2.default.decode(token, _constants2.default.JWT_SECRET);
      const tokenExpired = 30 < Math.floor((Date.now() - decoded.iat) / 1000 / 60);
      if (tokenExpired) throw "Password link expired";
      const account = yield _Account2.default.findById(decoded.sub).select('password').exec();
      yield account.update({ password: account._hashPassword(password) });
      res.json({ message: `Password reset successfully` });
    } catch (error) {
      res.json({ message: `Something went wrong while resetting the password`, error });
    }
  });

  return function resetPassword(_x18, _x19) {
    return _ref8.apply(this, arguments);
  };
})();

const forgotPasswordOTP = exports.forgotPasswordOTP = (() => {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      const { email } = req.body;
      if (!email) throw "Please provide the email address";
      const user = yield _User2.default.findOne({ email }).exec();

      if (user) {
        let otp = _shortid2.default.generate();
        yield user.update({ otp: { text: otp, createdOn: Date.now() } });
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
        };
        (0, _mails.sendMail)({ email, subject, mailContent });
      }

      res.json({ message: `Password reset OTP sent to ${email}` });
    } catch (error) {
      res.json({ message: `Something went wrong while sending password reset OTP`, error });
    }
  });

  return function forgotPasswordOTP(_x20, _x21) {
    return _ref9.apply(this, arguments);
  };
})();

const resetPasswordOTP = exports.resetPasswordOTP = (() => {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    try {
      const { password, otp } = req.body;
      if (!password || !otp) throw "Incomplete parameters";
      const [user] = yield _User2.default.find({ "otp.text": otp }).exec();
      if (!user) throw "Invalid OTP";
      if (!user.otp) throw "OTP not generated yet";
      const otpExpired = 15 < Math.floor((Date.now() - new Date(user.otp.createdOn)) / 1000 / 60);
      if (otpExpired) throw "OTP expired";
      yield user.update({ password: user._hashPassword(password), otp: {} });
      res.json({ message: `Password reset successfully` });
    } catch (error) {
      res.json({ message: `Something went wrong while resetting the password`, error });
    }
  });

  return function resetPasswordOTP(_x22, _x23) {
    return _ref10.apply(this, arguments);
  };
})();

const checkMobile = exports.checkMobile = (() => {
  var _ref11 = _asyncToGenerator(function* (req, res) {
    try {
      let user = yield _User2.default.findOne({ mobile: req.query.mobile }).exec();
      let taken = user !== null;
      res.json({ taken });
    } catch (error) {
      res.send({ error });
    }
  });

  return function checkMobile(_x24, _x25) {
    return _ref11.apply(this, arguments);
  };
})();

const checkEmail = exports.checkEmail = (() => {
  var _ref12 = _asyncToGenerator(function* (req, res) {
    try {
      let user = yield _User2.default.findOne({ email: req.query.email }).exec();
      let taken = user !== null;
      res.json({ taken });
    } catch (error) {
      res.send({ error });
    }
  });

  return function checkEmail(_x26, _x27) {
    return _ref12.apply(this, arguments);
  };
})();
