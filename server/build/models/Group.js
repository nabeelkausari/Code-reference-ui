'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GroupSchema = new _mongoose.Schema({
  name: String,
  description: String,
  isPrivate: Boolean,
  inviteLink: String,
  admins: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  ulama: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  users: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }]
}, { timestamps: true });

exports.default = _mongoose2.default.model('Group', GroupSchema);