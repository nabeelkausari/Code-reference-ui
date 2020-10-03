"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeVoteFromPost = exports.addVoteToPost = exports.getPosts = exports.createPost = undefined;

var _Post = require("../models/Post");

var _Post2 = _interopRequireDefault(_Post);

var _image = require("./image");

var _Image = require("../models/Image");

var _Image2 = _interopRequireDefault(_Image);

var _Alim = require("../models/Alim");

var _Alim2 = _interopRequireDefault(_Alim);

var _UserCircle = require("../models/UserCircle");

var _UserCircle2 = _interopRequireDefault(_UserCircle);

var _Vote = require("../models/Vote");

var _Vote2 = _interopRequireDefault(_Vote);

var _lodash = require("lodash");

var _AlimCircle = require("../models/AlimCircle");

var _AlimCircle2 = _interopRequireDefault(_AlimCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createPost = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const _req$body$newPost = req.body.newPost,
            { image } = _req$body$newPost,
            newPost = _objectWithoutProperties(_req$body$newPost, ["image"]);
      if (!newPost.text) throw "Write something before submitting";

      let post = yield new _Post2.default(Object.assign({}, newPost, {
        alim: req.account.alim._id,
        account: req.account.id
      })).save();

      let response = Object.assign({}, post._doc, {
        alim: {
          fullName: req.account.alim.fullName,
          maslak: req.account.alim.maslak
        }
      });

      if (image) {
        let imageBuffer = (0, _image.decodeBase64Image)(image.data);
        let postImage = yield new _Image2.default({ img: imageBuffer }).save();
        yield post.update({ image: postImage }).exec();
        response.image = postImage._id;
      }

      res.json(response);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function createPost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.createPost = createPost;
const getPosts = exports.getPosts = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const circle = req.account.isAlim ? yield _AlimCircle2.default.findOne({ account: req.account.id }).exec() : yield _UserCircle2.default.findOne({ account: req.account.id }).exec();

      // preparing the array of ulama whom auth account is following
      const postCreators = [...circle.followings];

      // if auth account is alim then pushing his alimId to ulama array
      if (req.account.isAlim) {
        postCreators.push(req.account.alim._id);
      }

      let posts = yield _Post2.default.find({ alim: { $in: postCreators } }).sort('-createdAt').limit(20).populate('alim', 'avatar fullName maslak').lean().exec();

      const votes = yield _Vote2.default.find({
        account: req.account.id, // select only auth account votes
        post: { $ne: null }, // only votes on post
        comment: { $eq: null // don't select votes on comment
        } }).lean().exec();

      // preparing the array of posts voted by auth account
      const votedPosts = votes.map(function (v) {
        return v.post.toString();
      });

      // add a 'hasVoted' flag if auth user has voted the post
      posts = posts.map(function (post) {
        return Object.assign({}, post, {
          hasVoted: votedPosts.indexOf(post._id.toString()) > -1
        });
      });

      res.json(posts);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getPosts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const addVoteToPost = exports.addVoteToPost = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res, next, io) {
    try {
      const post = yield _Post2.default.findOne({ _id: req.body.postId }).populate('votes').populate('alim').exec();

      if ((0, _lodash.some)(post.votes, function (vote) {
        return vote.account.toString() === req.account.id.toString();
      })) {
        throw "You already had voted this post";
      }

      const vote = yield new _Vote2.default({ account: req.account.id, post: req.body.postId }).save();
      const updatedVotes = [...post.votes.map(function (v) {
        return v._id;
      }), vote._id];
      yield post.update({ votes: updatedVotes });

      const updates = {
        postId: req.body.postId,
        votes: updatedVotes
      };

      io.emit('postVoteAdded', updates);
      res.json(Object.assign({}, updates, {
        hasVoted: true
      }));
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function addVoteToPost(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})();

const removeVoteFromPost = exports.removeVoteFromPost = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res, next, io) {
    try {
      const post = yield _Post2.default.findOne({ _id: req.body.postId }).populate('votes').exec();

      const vote = (0, _lodash.find)(post.votes, function (vote) {
        return vote.account.toString() === req.account.id.toString();
      });

      if (!vote) throw "You had not voted this post yet";

      yield _Vote2.default.remove({ _id: vote._id }).exec();

      const votes = post.votes.map(function (v) {
        return v._id;
      });
      const updatedVotes = [...votes.slice(0, votes.indexOf(vote._id)), ...votes.slice(votes.indexOf(vote._id) + 1, votes.length)];

      yield post.update({ votes: updatedVotes });

      const updates = {
        postId: req.body.postId,
        votes: updatedVotes
      };

      io.emit('postVoteRemoved', updates);
      res.json(Object.assign({}, updates, {
        hasVoted: false
      }));
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function removeVoteFromPost(_x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
})();