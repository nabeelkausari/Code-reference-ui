'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireAlim = exports.requireAdminLogin = exports.requireAdmin = exports.requireLogin = exports.requireAuth = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _passportJwt = require('passport-jwt');

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _Account = require('../models/Account');

var _Account2 = _interopRequireDefault(_Account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const localOptions = { usernameField: 'email' };
const localLogin = new _passportLocal2.default(localOptions, (() => {
  var _ref = _asyncToGenerator(function* (email, password, done) {
    try {
      let account = yield _Account2.default.findOne({ email }).populate('alim user').exec();
      if (!account) return done(null, false, { message: 'Incorrect username.' });
      if (!account.confirmed) return done(null, false, { message: 'Email not confirmed yet' });

      account.comparePassword(password, function (err, isMatch) {
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

        return done(null, account);
      });
    } catch (err) {
      return done(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

const adminLogin = new _passportLocal2.default(localOptions, (() => {
  var _ref2 = _asyncToGenerator(function* (email, password, done) {
    try {
      let account = yield _Account2.default.findOne({ email }).populate('alim user').exec();
      if (!account) return done(null, false);
      if (!account.isAdmin) done(null, false);

      account.comparePassword(password, function (err, isMatch) {
        if (!isMatch) return done(null, false);

        return done(null, account);
      });
    } catch (err) {
      return done(err);
    }
  });

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})());

const jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization'),
  secretOrKey: _constants2.default.JWT_SECRET
};

// Create JWT strategy
const jwtLogin = new _passportJwt.Strategy(jwtOptions, (() => {
  var _ref3 = _asyncToGenerator(function* (payload, done) {
    try {
      const account = yield _Account2.default.findById(payload.sub).populate('alim user').exec();
      if (account) done(null, account);else done(null, false);
    } catch (err) {
      return done(err, false);
    }
  });

  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})());

// Create Admin JWT strategy
const adminJWT = new _passportJwt.Strategy(jwtOptions, (() => {
  var _ref4 = _asyncToGenerator(function* (payload, done) {
    try {
      const account = yield _Account2.default.findById(payload.sub).populate('alim user').exec();
      if (account.isAdmin) done(null, account);else done(null, false);
    } catch (err) {
      return done(err, false);
    }
  });

  return function (_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
})());

// Create Alim JWT strategy
const alimJWT = new _passportJwt.Strategy(jwtOptions, (() => {
  var _ref5 = _asyncToGenerator(function* (payload, done) {
    try {
      const account = yield _Account2.default.findById(payload.sub).populate('alim user').exec();
      if (account.isAlim) done(null, account);else done(null, false);
    } catch (err) {
      return done(err, false);
    }
  });

  return function (_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
})());

const requireAuth = exports.requireAuth = _passport2.default.authenticate('jwt', { session: false });
const requireLogin = exports.requireLogin = _passport2.default.authenticate('local', { session: false });
const requireAdmin = exports.requireAdmin = _passport2.default.authenticate('admin-jwt', { session: false });
const requireAdminLogin = exports.requireAdminLogin = _passport2.default.authenticate('admin-login', { session: false });
const requireAlim = exports.requireAlim = _passport2.default.authenticate('alim-jwt', { session: false });

exports.default = app => {
  app.use(_passport2.default.initialize({ userProperty: 'account' }));
  _passport2.default.use('jwt', jwtLogin);
  _passport2.default.use('local', localLogin);
  _passport2.default.use('admin-jwt', adminJWT);
  _passport2.default.use('admin-login', adminLogin);
  _passport2.default.use('alim-jwt', alimJWT);
};