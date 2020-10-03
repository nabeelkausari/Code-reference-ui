'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inviteId = exports.getInvite = exports.getAllInvites = exports.getMyInvites = exports.resendInvite = exports.sendInvite = undefined;

var _lodash = require('lodash');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Invite = require('../models/Invite');

var _Invite2 = _interopRequireDefault(_Invite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const sendInvite = exports.sendInvite = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const { to, name, message } = req.body;
      if (!name) throw "Provide the name of alim";
      if (!to) throw "Provide the email address to send the invite";
      if (!message) throw "Provide the message to send with invite";

      let invite = yield new _Invite2.default({
        to, message, name,
        account: req.account.id
      }).save();

      // initiate email invitation

      res.json(invite);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function sendInvite(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const resendInvite = exports.resendInvite = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const { _id, to, message } = req.body;
      if (!_id) throw "Invite ID not provided";
      if (!to) throw "Provide the email address to send the invite";
      if (!message) throw "Provide the message to send with invite";

      let invite = yield _Invite2.default.findOne({ _id }).exec();

      if (invite.acceptedBy) throw "Invite has already been accepted";

      let updates = { to, message };
      yield invite.update(updates).exec();

      // resend email invitation

      res.json(Object.assign({
        _id
      }, updates, {
        updatedAt: new Date()
      }));
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function resendInvite(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const getMyInvites = exports.getMyInvites = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      const invites = yield _Invite2.default.find({ account: req.account.id }).populate('acceptedBy', 'avatar fullName maslak').sort('-createdAt').select('-__v').exec();

      res.json(invites);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getMyInvites(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

const getAllInvites = exports.getAllInvites = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      const invites = yield _Invite2.default.find({}).populate('acceptedBy', 'avatar fullName maslak').select('-__v').exec();

      res.json(invites);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getAllInvites(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

const getInvite = exports.getInvite = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      res.json(req.invite);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getInvite(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

const inviteId = exports.inviteId = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res, next, _id) {
    try {
      if (!_mongoose2.default.Types.ObjectId.isValid(_id)) {
        throw "Invalid invite ID";
      }
      req.invite = yield _Invite2.default.findOne({ _id }).populate({
        path: 'account',
        select: 'alim',
        populate: {
          path: 'alim',
          select: 'fullName maslak'
        }
      }).populate('acceptedBy', 'fullName maslak').select('-__v').exec();
      next();
    } catch (err) {
      next(err);
    }
  });

  return function inviteId(_x11, _x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
})();