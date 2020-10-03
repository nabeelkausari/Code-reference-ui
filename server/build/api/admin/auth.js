"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAdmin = exports.adminLogin = undefined;

var _User = require("../../models/User");

var _User2 = _interopRequireDefault(_User);

var _auth = require("../../services/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const adminLogin = exports.adminLogin = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    let { email, firstName, lastName, confirmed, isAdmin } = req.user;
    res.send({ jwt: (0, _auth.tokenForUser)(req.user), user: { email, firstName, lastName, confirmed, isAdmin } });
  });

  return function adminLogin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

const makeAdmin = exports.makeAdmin = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      const { email, mailDetails } = req.body;
      if (!email) {
        return res.status(422).send({ error: `Email is required` });
      }
      if (!mailDetails) {
        return res.status(422).send({ error: `Mail details are required` });
      }

      const existingUser = yield _User2.default.findOne({ email }).exec();
      if (existingUser.isAdmin) {
        return res.status(422).send({ error: 'User is already an Admin' });
      }

      const adminUser = yield existingUser.update({ buyer: false, seller: false, isAdmin: true, mailDetails }, { new: true }).exec();

      res.json({ adminUser });
    } catch (err) {
      return next(err);
    }
  });

  return function makeAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();