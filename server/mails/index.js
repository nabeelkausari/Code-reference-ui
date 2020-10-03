import nodeMailer from 'nodemailer';
import env from 'node-env-file';

env('./.keys');
import accountConfirmationTemplate from './templates/accountConfirmation';
import defaultTemplate from './templates/default';
import withActionTemplate from './templates/withAction';
import {apiUrl} from "../config/constants";

let transporter = nodeMailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.emailUser,
    pass: process.env.emailPass
  }
});

export const verificationMail = ({ email, jwt}) => {
  let mailOptions = {
    from: '"Alimbook" <info@alimbook.com>',
    to: email,
    subject: 'Account Confirmation',
    html: accountConfirmationTemplate(`${apiUrl}/api/confirm-email/${jwt}`)
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

export const sendMail = ({ email, subject, mailContent }) => {
  let mailOptions = {
    from: '"Alimbook" <info@alimbook.com>',
    to: email,
    subject,
    html: defaultTemplate(mailContent)
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

export const sendMailWithAction = ({ email, subject, mailContent }) => {
  let mailOptions = {
    from: '"Alimbook" <info@alimbook.com>',
    to: email,
    subject,
    html: withActionTemplate(mailContent)
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

//-- Signup completed --- user | referred | direct | indirect
//-- Deposit Completed
//-- Withdrawal Completed

//-- Bonus claim received
//-- Bonus claim approved
//-- Bonus received parent

//-- Purchase token
//-- Money back received
//-- Referral received --- direct | indirect
