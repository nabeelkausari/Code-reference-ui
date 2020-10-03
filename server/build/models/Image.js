'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ImageSchema = new _mongoose.Schema({
  account: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  post: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  answer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  },
  question: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  img: {
    data: Buffer,
    contentType: String
  }
}, { timestamps: true });

exports.default = _mongoose2.default.model('Image', ImageSchema);