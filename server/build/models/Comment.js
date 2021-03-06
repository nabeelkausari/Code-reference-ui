'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CommentSchema = new _mongoose.Schema({
  account: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  alim: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Alim'
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  answer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  },
  text: String,
  votes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }]
}, { timestamps: true });

exports.default = _mongoose2.default.model('Comment', CommentSchema);