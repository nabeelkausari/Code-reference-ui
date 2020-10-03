"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postId = exports.commentId = exports.getPostDetails = exports.getPostComments = exports.removePostComment = exports.addPostComment = undefined;

var _Comment = require("../models/Comment");

var _Comment2 = _interopRequireDefault(_Comment);

var _lodash = require("lodash");

var _Post = require("../models/Post");

var _Post2 = _interopRequireDefault(_Post);

var _Vote = require("../models/Vote");

var _Vote2 = _interopRequireDefault(_Vote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const addPostComment = exports.addPostComment = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next, io) {
    try {
      const post = yield getPostDetails(req.post._id, req.account.id);

      if (!req.body.comment.text) {
        throw "Write something before submitting the comment";
      }
      const profileId = req.account.isAlim ? { alim: req.account.alim._id } : { user: req.account.user._id };
      const comment = yield new _Comment2.default(Object.assign({}, req.body.comment, {
        post: req.post._id,
        account: req.account.id
      }, profileId)).save();

      const profile = req.account.isAlim ? { alim: Object.assign({}, req.account.alim._doc) } : { user: Object.assign({}, req.account.user._doc) };

      let commentsUpdated = [Object.assign({}, comment._doc, profile), ...post.comments];

      yield req.post.update({ comments: commentsUpdated }).exec();

      let response = Object.assign({}, post, {
        comments: commentsUpdated
      });

      io.emit('postCommentAdded', response);
      res.json(response);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function addPostComment(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

const removePostComment = exports.removePostComment = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next, io) {
    try {
      const post = yield getPostDetails(req.post._id, req.account.id);
      let commentIndex = (0, _lodash.findIndex)(post.comments, function (comment) {
        return comment._id.toString() === req.comment._id.toString();
      });

      let commentsUpdated = [...post.comments.slice(0, commentIndex), ...post.comments.slice(commentIndex + 1, post.comments.length)];

      yield req.post.update({ comments: commentsUpdated }).exec();
      yield req.comment.remove().exec();

      let response = Object.assign({}, post, {
        comments: commentsUpdated
      });

      io.emit('postCommentRemoved', response);
      res.json(response);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function removePostComment(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
})();

const getPostComments = exports.getPostComments = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      const post = yield getPostDetails(req.post._id, req.account.id);
      res.json(post);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function getPostComments(_x9, _x10) {
    return _ref3.apply(this, arguments);
  };
})();

const getPostDetails = exports.getPostDetails = (() => {
  var _ref4 = _asyncToGenerator(function* (_id, account) {
    try {
      const post = yield _Post2.default.findOne({ _id }).populate('votes').populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'user alim'
        }
      }).select('-__v').lean().exec();

      const commentVotes = yield _Vote2.default.find({
        account,
        post: post._id,
        comment: { $ne: null // select only votes on comment
        } }).lean().exec();

      const votedPosts = commentVotes.map(function (v) {
        return v.comment.toString();
      });

      const comments = post.comments.map(function (comment) {
        return Object.assign({}, comment, {
          hasVoted: votedPosts.indexOf(comment._id.toString()) > -1
        });
      });

      return Object.assign({}, post, {
        comments
      });
    } catch (err) {
      throw err;
    }
  });

  return function getPostDetails(_x11, _x12) {
    return _ref4.apply(this, arguments);
  };
})();

const commentId = exports.commentId = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res, next, _id) {
    try {
      req.comment = yield _Comment2.default.findOne({ _id }).populate('votes').select('-__v').exec();
      next();
    } catch (err) {
      next(err);
    }
  });

  return function commentId(_x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
})();

const postId = exports.postId = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res, next, _id) {
    try {
      req.post = yield _Post2.default.findOne({ _id }).exec();
      next();
    } catch (err) {
      next(err);
    }
  });

  return function postId(_x17, _x18, _x19, _x20) {
    return _ref6.apply(this, arguments);
  };
})();