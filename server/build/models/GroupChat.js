'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GroupChatSchema = new _mongoose.Schema({
  group: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  sender: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  readBy: [{
    user: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    time: Date
  }]
}, { timestamps: true });

exports.default = _mongoose2.default.model('GroupChat', GroupChatSchema);