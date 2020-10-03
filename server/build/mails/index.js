'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = exports.alimVerificationMail = exports.sendInvitationMail = exports.verificationMail = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodeEnvFile = require('node-env-file');

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

var _accountConfirmation = require('./templates/accountConfirmation');

var _accountConfirmation2 = _interopRequireDefault(_accountConfirmation);

var _default = require('./templates/default');

var _default2 = _interopRequireDefault(_default);

var _marketing = require('./templates/marketing');

var _marketing2 = _interopRequireDefault(_marketing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nodeEnvFile2.default)('./.keys');


let transporter = _nodemailer2.default.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.emailUser,
    pass: process.env.emailPass
  }
});

const verificationMail = exports.verificationMail = ({ email, jwt }) => {
  let mailOptions = {
    from: '"Alimbook" <info@bidable.in>',
    to: email,
    subject: 'Account Confirmation',
    html: (0, _accountConfirmation2.default)(`https://www.alimbook.com/api/confirm-email/${jwt}`)
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

const sendInvitationMail = exports.sendInvitationMail = ({ email, inviteId }) => {
  let mailOptions = {
    from: '"Alimbook" <info@bidable.in>',
    to: email,
    subject: 'Alim Invitation',
    html: (0, _accountConfirmation2.default)(`http://localhost:3000/auth/register-alim/${inviteId}`)
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

const alimVerificationMail = exports.alimVerificationMail = ({ email, jwt }) => {
  let mailOptions = {
    from: '"Alimbook" <info@bidable.in>',
    to: email,
    subject: 'Account Confirmation',
    html: (0, _accountConfirmation2.default)(`https://www.alimbook.com/api/invite-confirm/${jwt}`)
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

const sendMail = exports.sendMail = ({ email, subject, mailContent }) => {
  let mailOptions = {
    from: '"Alimbook" <info@bidable.in>',
    to: email,
    subject,
    html: (0, _default2.default)(mailContent)
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

//-- Signup completed --- user | referred | direct | indirect
//-- Deposit Completed
//-- Withdrawal Completed

//-- Bonus claim received
//-- Bonus claim approved
//-- Bonus received parent

//-- Purchase token
//-- Money back received
//-- Referral received --- direct | indirect
