'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageId = exports.getImage = exports.decodeBase64Image = undefined;

var _Image = require('../models/Image');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const decodeBase64Image = exports.decodeBase64Image = dataString => {
  let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.contentType = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
};

const getImage = exports.getImage = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      res.contentType(req.image.img.contentType);
      res.send(req.image.img.data);
    } catch (err) {
      res.send(err);
    }
  });

  return function getImage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const imageId = exports.imageId = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next, _id) {
    try {
      req.image = yield _Image2.default.findOne({ _id }).exec();
      next();
    } catch (err) {
      next(err);
    }
  });

  return function imageId(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();