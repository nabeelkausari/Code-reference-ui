'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MemberSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  group: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  active: Boolean,
  leftOn: Date
}, { timestamps: true });

MemberSchema.index({ user: 1, group: 1 }, { unique: true });

exports.default = _mongoose2.default.model('Member', MemberSchema);