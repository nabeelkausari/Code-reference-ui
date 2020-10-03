"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMyQuestions = exports.getMyAnswers = exports.getMyPosts = exports.getProfile = exports.updateProfile = exports.updateAvatar = undefined;

var _Image = require("../models/Image");

var _Image2 = _interopRequireDefault(_Image);

var _Post = require("../models/Post");

var _Post2 = _interopRequireDefault(_Post);

var _Answer = require("../models/Answer");

var _Answer2 = _interopRequireDefault(_Answer);

var _Question = require("../models/Question");

var _Question2 = _interopRequireDefault(_Question);

var _Alim = require("../models/Alim");

var _Alim2 = _interopRequireDefault(_Alim);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

var _image = require("./image");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const updateAvatar = exports.updateAvatar = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const { avatar } = req.body.profile;
      const { isAlim } = req.account;
      if (!avatar) throw "No avatar provided";
      const profile = isAlim ? req.account.alim : req.account.user;

      if (profile.avatar) {
        yield _Image2.default.findByIdAndDelete(profile.avatar).exec();
      }

      let imageBuffer = (0, _image.decodeBase64Image)(avatar.data);
      let avatarImage = yield new _Image2.default({ img: imageBuffer }).save();

      isAlim ? yield _Alim2.default.findByIdAndUpdate(profile._id, { avatar: avatarImage._id }).exec() : yield _User2.default.findByIdAndUpdate(profile._id, { avatar: avatarImage._id }).exec();

      res.json({
        avatar: avatarImage._id
      });
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function updateAvatar(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
const updateProfile = exports.updateProfile = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const { fullName, maslak, dob, gender } = req.body.profile;
      const { isAlim } = req.account;
      const profile = isAlim ? req.account.alim : req.account.user;

      const updates = {};
      if (fullName) updates.fullName = fullName;
      if (maslak) updates.maslak = maslak;
      if (dob) updates.dob = dob;
      if (gender) updates.gender = gender;

      isAlim ? yield _Alim2.default.findByIdAndUpdate(profile._id, updates).exec() : yield _User2.default.findByIdAndUpdate(profile._id, updates).exec();

      res.json(Object.assign({}, updates));
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function updateProfile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const getProfile = exports.getProfile = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      res.json(req.account.isAlim ? req.account.alim : req.account.user);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getProfile(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

const getMyPosts = exports.getMyPosts = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      const posts = yield _Post2.default.find({ alim: req.account.alim._id }).exec();
      res.json(posts);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getMyPosts(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

const getMyAnswers = exports.getMyAnswers = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      const answers = yield _Answer2.default.find({ alim: req.account.alim._id }).populate('question').exec();
      res.json(answers);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getMyAnswers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

const getMyQuestions = exports.getMyQuestions = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      const questions = yield _Question2.default.find({ account: req.account.id }).exec();
      res.json(questions);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getMyQuestions(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})();