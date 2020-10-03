"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMails = exports.sendMarketingMail = undefined;

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _Mail = require("../../models/Mail");

var _Mail2 = _interopRequireDefault(_Mail);

var _marketing = require("../../mails/templates/marketing");

var _marketing2 = _interopRequireDefault(_marketing);

var _User = require("../../models/User");

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const sendMarketingMail = exports.sendMarketingMail = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const { recipient, cc, subject, body } = req.body;

      if (!recipient) throw "Recipient email is required";
      if (!subject) throw "Subject is required";
      if (!body || !body.length) throw "Body is required";

      let user = yield _User2.default.findById(req.user.id).exec();
      if (!user) throw "User not found";

      let { mailDetails: { email, password, name, designation }, mobile } = user;

      let transporter = _nodemailer2.default.createTransport({
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
        html: (0, _marketing2.default)({
          title: subject,
          hiddenMessage: subject,
          body,
          senderName: name,
          senderDesignation: designation,
          senderPhone: mobile
        })
      };

      transporter.sendMail(mailOptions, (() => {
        var _ref2 = _asyncToGenerator(function* (error, info) {
          if (error) return console.log(error);

          let mail = yield new _Mail2.default({
            from: email,
            to: recipient,
            subject, body,
            user: req.user.id
          }).save();

          res.json({ sent: true, mail });
        });

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      })());
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function sendMarketingMail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const getMails = exports.getMails = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      let user = yield _User2.default.findById(req.user.id).exec();
      if (!user) throw "User not found";

      let { email } = user.mailDetails;

      let mails = yield _Mail2.default.find({ from: email }).sort('-createdAt').exec();
      res.json(mails);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getMails(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();