import nodeMailer from 'nodemailer';

import Mail from "../../models/Mail"
import marketingTemplate from "../../mails/templates/marketing";
import User from "../../models/User"

export const sendMarketingMail = async (req, res) => {
  try {
    const {recipient, cc, subject, body} = req.body

    if (!recipient) throw "Recipient email is required";
    if (!subject) throw "Subject is required";
    if (!body || !body.length) throw "Body is required";

    let user = await User.findById(req.user.id).exec();
    if (!user) throw "User not found";

    let { mailDetails: {email, password, name, designation}, mobile } = user;

    let transporter = nodeMailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: email,
        pass: password
      }
    });

    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: recipient,
      subject,
      cc,
      html: marketingTemplate({
        title: subject,
        hiddenMessage: subject,
        body,
        senderName: name,
        senderDesignation: designation,
        senderPhone: mobile
      })
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) return console.log(error);

      let mail = await new Mail({
        from: email,
        to: recipient,
        subject, body,
        user: req.user.id
      }).save();

      res.json({ sent: true, mail })
    });

  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getMails = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).exec();
    if (!user) throw "User not found";

    let { email } = user.mailDetails;

    let mails = await Mail.find({from: email}).sort('-createdAt').exec();
    res.json(mails)
  } catch (error) {
    res.status(422).send({ error });
  }
};
