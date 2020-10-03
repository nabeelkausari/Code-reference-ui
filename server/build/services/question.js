"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionId = exports.answeredQuestionId = exports.getQuestion = exports.getQuestions = exports.getAnsweredQuestion = exports.getAnsweredQuestions = exports.createQuestion = undefined;

var _Question = require("../models/Question");

var _Question2 = _interopRequireDefault(_Question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createQuestion = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const _req$body$question = req.body.question,
            { text } = _req$body$question,
            rest = _objectWithoutProperties(_req$body$question, ["text"]);
      const { isAlim } = req.account;
      if (!text) throw "Write something before submitting";

      const profileId = isAlim ? { alim: req.account.alim._id } : { user: req.account.user._id };

      let question = yield new _Question2.default(Object.assign({
        text
      }, rest, {
        account: req.account.id,
        maslak: req.account[isAlim ? 'alim' : 'user'].maslak
      }, profileId)).save();

      res.json(question);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function createQuestion(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.createQuestion = createQuestion;
const getAnsweredQuestions = exports.getAnsweredQuestions = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const query = req.query.param ? Object.assign({}, req.query.param) : {};
      const questions = yield _Question2.default.find(Object.assign({}, query, { answers: { $exists: true, $ne: [] } })).sort('-createdAt').limit(20).populate('user', 'fullName avatar maslak').populate('alim', 'fullName avatar maslak').lean().exec();

      res.json(questions);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getAnsweredQuestions(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const getAnsweredQuestion = exports.getAnsweredQuestion = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      res.json(req.answeredQuestion);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getAnsweredQuestion(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

const getQuestions = exports.getQuestions = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      const query = req.query.param ? Object.assign({}, req.query.param) : {};
      const questions = yield _Question2.default.find(Object.assign({}, query, { answers: { $eq: [] } })).sort('-createdAt').limit(20).populate('user', 'fullName avatar maslak').populate('alim', 'fullName avatar maslak').lean().exec();

      res.json(questions);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getQuestions(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

const getQuestion = exports.getQuestion = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      res.json(req.question);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getQuestion(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

const answeredQuestionId = exports.answeredQuestionId = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res, next, _id) {
    try {
      req.answeredQuestion = yield _Question2.default.findOne({ _id, answers: { $exists: true, $ne: [] } }).populate('answers').select('-__v').exec();
      next();
    } catch (err) {
      next(err);
    }
  });

  return function answeredQuestionId(_x11, _x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
})();

const questionId = exports.questionId = (() => {
  var _ref7 = _asyncToGenerator(function* (req, res, next, _id) {
    try {
      req.question = yield _Question2.default.findOne({ _id }).select('-__v').exec();
      next();
    } catch (err) {
      next(err);
    }
  });

  return function questionId(_x15, _x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
})();