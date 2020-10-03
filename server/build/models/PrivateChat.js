'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GroupChatSchema = new _mongoose.Schema({
  sender: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  readByReceiver: Boolean,
  readOn: Date
}, { timestamps: true });

exports.default = _mongoose2.default.model('GroupChat', GroupChatSchema);