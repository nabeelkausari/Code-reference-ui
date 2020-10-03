'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Counter = require('../models/Counter');

var _Counter2 = _interopRequireDefault(_Counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator(function* () {
  let auctionQuery = { id: 'auctionId' };
  let userQuery = { id: 'userId' };

  let auctionCounter = yield _Counter2.default.find(auctionQuery).exec();
  if (auctionCounter.length === 0) {
    yield new _Counter2.default(Object.assign({}, auctionQuery, { seq: 200 })).save();
  }

  let userCounter = yield _Counter2.default.find(userQuery).exec();
  if (userCounter.length === 0) {
    yield new _Counter2.default(Object.assign({}, userQuery, { seq: 300 })).save();
  }
});