"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.answerId = exports.getAnswer = exports.getAnswers = exports.createAnswer = undefined;

var _Answer = require("../models/Answer");

var _Answer2 = _interopRequireDefault(_Answer);

var _Question = require("../models/Question");

var _Question2 = _interopRequireDefault(_Question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createAnswer = exports.createAnswer = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const answer = yield new _Answer2.default(Object.assign({}, req.body.answer, {
        account: req.account.id,
        alim: req.account.alim._id
      })).save();

      const question = yield _Question2.default.findOne({ _id: req.body.answer.question }).exec();
      yield question.update({
        answers: [...question.answers, answer._id]
      }).exec();

      res.json(answer);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function createAnswer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const getAnswers = exports.getAnswers = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const answers = yield _Answer2.default.find({ question: req.question._id }).sort('-createdAt').limit(20).populate('votes').populate('alim').lean().exec();

      res.json(Object.assign({}, req.question._doc, {
        answers
      }));
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getAnswers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const getAnswer = exports.getAnswer = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      res.json(req.answer);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getAnswer(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

const answerId = exports.answerId = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res, next, _id) {
    try {
      req.answer = yield _Answer2.default.findOne({ _id }).populate('votes').select('-__v').exec();
      next();
    } catch (err) {
      next(err);
    }
  });

  return function answerId(_x7, _x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
})();