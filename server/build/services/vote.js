"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeVoteFromAnswer = exports.addVoteToAnswer = exports.removeVoteFromComment = exports.addVoteToComment = undefined;

var _lodash = require("lodash");

var _Vote = require("../models/Vote");

var _Vote2 = _interopRequireDefault(_Vote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const addVoteToComment = exports.addVoteToComment = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next, io) {
    try {
      if ((0, _lodash.some)(req.comment.votes, function (vote) {
        return vote.account.toString() === req.account.id.toString();
      })) {
        throw "You already had voted this comment";
      }

      const vote = yield new _Vote2.default({
        account: req.account.id,
        comment: req.comment._id,
        post: req.comment.post
      }).save();

      const updatedVotes = [...req.comment.votes.map(function (v) {
        return v._id;
      }), vote._id];
      yield req.comment.update({ votes: updatedVotes });

      const updates = {
        commentId: req.comment._id,
        postId: req.comment.post,
        votes: updatedVotes
      };

      io.emit('commentVoteAdded', updates);
      res.json(Object.assign({}, updates, {
        hasVoted: true
      }));
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function addVoteToComment(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

const removeVoteFromComment = exports.removeVoteFromComment = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next, io) {
    try {

      const vote = (0, _lodash.find)(req.comment.votes, function (vote) {
        return vote.account.toString() === req.account.id.toString();
      });

      if (!vote) throw "You had not voted this comment yet";

      yield _Vote2.default.remove({ _id: vote._id }).exec();

      const votes = req.comment.votes.map(function (v) {
        return v._id;
      });

      const updatedVotes = [...votes.slice(0, votes.indexOf(vote._id)), ...votes.slice(votes.indexOf(vote._id) + 1, votes.length)];

      yield req.comment.update({ votes: updatedVotes });

      const updates = {
        commentId: req.comment._id,
        postId: req.comment.post,
        votes: updatedVotes
      };

      io.emit('commentVoteRemoved', updates);
      res.json(Object.assign({}, updates, {
        hasVoted: false
      }));
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function removeVoteFromComment(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
})();

const addVoteToAnswer = exports.addVoteToAnswer = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res, next, io) {
    try {
      if ((0, _lodash.some)(req.answer.votes, function (vote) {
        return vote.account.toString() === req.account.id.toString();
      })) {
        throw "You already had voted this answer";
      }

      const vote = yield new _Vote2.default({
        account: req.account.id,
        answer: req.answer._id
      }).save();

      const updatedVotes = [...req.answer.votes.map(function (v) {
        return v._id;
      }), vote._id];
      yield req.answer.update({ votes: updatedVotes });

      const updates = {
        answerId: req.answer._id,
        questionId: req.answer.question,
        votes: updatedVotes
      };

      io.emit('answerVoteAdded', updates);
      res.json(Object.assign({}, updates, {
        hasVoted: true
      }));
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function addVoteToAnswer(_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
})();

const removeVoteFromAnswer = exports.removeVoteFromAnswer = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res, next, io) {
    try {

      const vote = (0, _lodash.find)(req.answer.votes, function (vote) {
        return vote.account.toString() === req.account.id.toString();
      });

      if (!vote) throw "You had not voted this answer yet";

      yield _Vote2.default.remove({ _id: vote._id }).exec();

      const votes = req.answer.votes.map(function (v) {
        return v._id;
      });

      const updatedVotes = [...votes.slice(0, votes.indexOf(vote._id)), ...votes.slice(votes.indexOf(vote._id) + 1, votes.length)];

      yield req.answer.update({ votes: updatedVotes });

      const updates = {
        answerId: req.answer._id,
        questionId: req.answer.question,
        votes: updatedVotes
      };

      io.emit('answerVoteRemoved', updates);
      res.json(Object.assign({}, updates, {
        hasVoted: false
      }));
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  return function removeVoteFromAnswer(_x13, _x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
})();