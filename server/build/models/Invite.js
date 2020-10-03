'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InviteSchema = new _mongoose.Schema({
  account: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  name: String, //emailId
  to: String, //emailId
  message: String,
  acceptedBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Alim'
  }
}, { timestamps: true });

exports.default = _mongoose2.default.model('Invite', InviteSchema);