"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alimId = exports.getAlimAnswers = exports.getAlimPosts = exports.getAlimProfile = exports.unFollowAlim = exports.followAlim = exports.getMyCircles = exports.getUlama = undefined;

var _Alim = require("../models/Alim");

var _Alim2 = _interopRequireDefault(_Alim);

var _AlimCircle = require("../models/AlimCircle");

var _AlimCircle2 = _interopRequireDefault(_AlimCircle);

var _UserCircle = require("../models/UserCircle");

var _UserCircle2 = _interopRequireDefault(_UserCircle);

var _Post = require("../models/Post");

var _Post2 = _interopRequireDefault(_Post);

var _Answer = require("../models/Answer");

var _Answer2 = _interopRequireDefault(_Answer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getUlama = exports.getUlama = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const { maslak } = req.query;
      const query = maslak ? { maslak } : {};
      const ulama = yield _Alim2.default.find(Object.assign({}, query)).exec();

      res.json(ulama);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getUlama(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const getMyCircles = exports.getMyCircles = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      let circles = req.account.isAlim ? yield _AlimCircle2.default.findOne({ account: req.account.id }).lean().exec() : yield _UserCircle2.default.findOne({ account: req.account.id }).lean().exec();

      res.json(circles);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getMyCircles(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const followAlim = exports.followAlim = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      const { alim } = req.body;
      const followerId = req.account.isAlim ? req.account.alim._id.toString() : req.account.user._id.toString();
      if (!alim) throw "Alim Id is required";

      const circle = req.account.isAlim ? yield _AlimCircle2.default.findOne({ account: req.account.id }).exec() : yield _UserCircle2.default.findOne({ account: req.account.id }).exec();

      const alimCircle = yield _AlimCircle2.default.findOne({ alim }).exec();
      if (!alimCircle) throw "No Alim found with this ID";

      const isFollowing = circle.followings.indexOf(alim) > -1;
      const isAlimsFollower = req.account.isAlim ? alimCircle.alimFollowers.indexOf(followerId) > -1 : alimCircle.followers.indexOf(followerId) > -1;

      if (isFollowing || isAlimsFollower) {
        throw "You are already following this alim";
      }

      const circleUpdate = [...circle.followings, alim];

      const alimCircleUpdate = req.account.isAlim ? {
        alimFollowers: [...alimCircle.alimFollowers, followerId]
      } : {
        followers: [...alimCircle.followers, followerId]
      };

      yield circle.update({ followings: circleUpdate }).exec();

      yield alimCircle.update(alimCircleUpdate).exec();

      res.json(circleUpdate);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function followAlim(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

const unFollowAlim = exports.unFollowAlim = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      const { alim } = req.body;
      const followerId = req.account.isAlim ? req.account.alim._id.toString() : req.account.user._id.toString();
      if (!alim) throw "Alim Id is required";

      const circle = req.account.isAlim ? yield _AlimCircle2.default.findOne({ account: req.account.id }).exec() : yield _UserCircle2.default.findOne({ account: req.account.id }).exec();

      const alimCircle = yield _AlimCircle2.default.findOne({ alim }).exec();
      if (!alimCircle) throw "No Alim found with this ID";

      const isFollowing = circle.followings.indexOf(alim) > -1;
      const isAlimsFollower = req.account.isAlim ? alimCircle.alimFollowers.indexOf(followerId) > -1 : alimCircle.followers.indexOf(followerId) > -1;

      if (!isFollowing || !isAlimsFollower) {
        throw "You are not following this alim";
      }

      const circleUpdate = [...circle.followings.slice(0, circle.followings.indexOf(alim)), ...circle.followings.slice(circle.followings.indexOf(alim) + 1)];

      const alimCircleUpdate = req.account.isAlim ? {
        alimFollowers: [...alimCircle.alimFollowers.slice(0, alimCircle.alimFollowers.indexOf(followerId)), ...alimCircle.alimFollowers.slice(alimCircle.alimFollowers.indexOf(followerId) + 1)]
      } : {
        followers: [...alimCircle.followers.slice(0, alimCircle.followers.indexOf(followerId)), ...alimCircle.followers.slice(alimCircle.followers.indexOf(followerId) + 1)]
      };

      yield circle.update({ followings: circleUpdate }).exec();
      yield alimCircle.update(alimCircleUpdate).exec();

      res.json(circleUpdate);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function unFollowAlim(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

// export const updateAlimProfile = async (req, res) => {
//   try {
//     const alim = await Alim.findOne({ _id: req.user.alimId }).exec();
//     if (!alim) throw "User has no alim profile";
//
//     await alim.update({ ...req.body.profileUpdate }).exec();
//
//     res.json({
//       ...alim._doc,
//       ...req.body.profileUpdate
//     });
//   } catch (error) {
//     res.status(422).send({ error });
//   }
// }

const getAlimProfile = exports.getAlimProfile = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      res.json(req.alim);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getAlimProfile(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

const getAlimPosts = exports.getAlimPosts = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      const posts = yield _Post2.default.find({ alim: req.alim._id }).sort('-createdAt').limit(20).lean().exec();

      res.json(posts);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getAlimPosts(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})();

const getAlimAnswers = exports.getAlimAnswers = (() => {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      const answers = yield _Answer2.default.find({ alim: req.alim._id }).sort('-createdAt').limit(20).lean().exec();

      res.json(answers);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getAlimAnswers(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
})();

const alimId = exports.alimId = (() => {
  var _ref8 = _asyncToGenerator(function* (req, res, next, _id) {
    try {
      req.alim = yield _Alim2.default.findOne({ _id }).exec();
      next();
    } catch (err) {
      next(err);
    }
  });

  return function alimId(_x15, _x16, _x17, _x18) {
    return _ref8.apply(this, arguments);
  };
})();