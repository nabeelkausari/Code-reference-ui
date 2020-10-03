'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AlimSchema = new _mongoose.Schema({
  account: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    unique: true
  },
  fullName: String,
  avatar: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  gender: String,
  dob: Date,
  maslak: String,
  circle: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'AlimCircle'
  },
  cover: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  titles: {
    preName: [String],
    postName: [String]
  },
  education: [{
    course: String,
    institute: String,
    period: {
      from: Date,
      to: Date
    }
  }],
  experience: [{
    designation: String,
    workplace: {
      type: String, // Masjid or Madrasah
      name: String
    },
    period: {
      from: Date,
      to: Date
    }
  }]
}, { timestamps: true });

exports.default = _mongoose2.default.model('Alim', AlimSchema);