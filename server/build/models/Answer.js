'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AnswerSchema = new _mongoose.Schema({
  account: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  alim: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Alim'
  },
  question: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  text: String,
  userRead: Boolean,
  readOn: Date,
  userVoted: Boolean,
  commentsDisabled: Boolean,
  comments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  votes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }]
}, { timestamps: true });

exports.default = _mongoose2.default.model('Answer', AnswerSchema);