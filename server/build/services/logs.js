'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logError = exports.logAction = exports.addLog = undefined;

var _Log = require('../models/Log');

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const addLog = exports.addLog = (() => {
  var _ref = _asyncToGenerator(function* (userId, title) {
    try {
      console.log({ title });
      return yield new _Log2.default({ userId, title }).save();
    } catch (error) {
      console.log({ title, error });
    }
  });

  return function addLog(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const logAction = exports.logAction = (() => {
  var _ref2 = _asyncToGenerator(function* (logId, action) {
    try {
      let log = yield _Log2.default.findById(logId).exec();
      yield log.update({ actions: [...log.actions, action] });
      console.log({ title: log.title, action });
    } catch (error) {
      console.log({ error });
    }
  });

  return function logAction(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const logError = exports.logError = (() => {
  var _ref3 = _asyncToGenerator(function* (logId, error) {
    try {
      let log = yield _Log2.default.findById(logId).exec();
      yield log.update({ error });
      console.log({ title: log.title, error });
    } catch (error) {
      console.log({ error });
    }
  });

  return function logError(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();