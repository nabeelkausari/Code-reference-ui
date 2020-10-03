'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let auth = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const token = req.headers.authorization;
      if (token !== null) {
        req.user = yield (0, _auth.decodeToken)(token);
      } else {
        req.user = null;
      }
      return next();
    } catch (err) {
      throw err;
    }
  });

  return function auth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _auth = require('../services/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = app => {
  app.use((0, _cors2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json({ limit: '5mb' }));
  if (process.env.NODE_ENV !== "test") {
    app.use((0, _morgan2.default)('combined'));
  }
  // app.use(auth);
};