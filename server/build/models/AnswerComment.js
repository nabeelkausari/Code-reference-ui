'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AnswerCommentSchema = new _mongoose.Schema({
  account: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  answer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  },
  text: String
}, { timestamps: true });

exports.default = _mongoose2.default.model('AnswerComment', AnswerCommentSchema);