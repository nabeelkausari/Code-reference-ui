'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const QuestionSchema = new _mongoose.Schema({
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
  text: String,
  maslak: String,
  anonymous: Boolean,
  privateQuestion: Boolean,
  to: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Alim'
  }],
  answers: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }]
}, { timestamps: true });

exports.default = _mongoose2.default.model('Question', QuestionSchema);