"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCategory = exports.getCategories = undefined;

var _Category = require("../../models/Category");

var _Category2 = _interopRequireDefault(_Category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getCategories = exports.getCategories = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const categories = yield _Category2.default.find({}).exec();
      res.json(categories);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getCategories(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const addCategory = exports.addCategory = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      if (!req.body.name) throw "Category name is required";
      const category = yield new _Category2.default({ name: req.body.name }).save();
      res.json(category);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function addCategory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();