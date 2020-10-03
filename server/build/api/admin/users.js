'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = undefined;

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getUsers = exports.getUsers = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const users = yield _User2.default.find({}).select('email bonusClaimed bonusApproved confirmed createdAt').sort('-createdAt').exec();
      res.json(users);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();