'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PrivateRoomSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  other: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  accepted: Boolean,
  chat: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'PrivateChat'
  }]
}, { timestamps: true });

PrivateRoomSchema.index({ user: 1, other: 1 }, { unique: true });

exports.default = _mongoose2.default.model('PrivateRoom', PrivateRoomSchema);