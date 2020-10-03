'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
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
    ref: 'UserCircle'
  }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  comparePassword(candidatePassword, callback) {
    (0, _bcryptNodejs.compare)(candidatePassword, this.password, function (err, isMatch) {
      if (err) return callback(err);

      return callback(null, isMatch);
    });
  }
};
exports.default = _mongoose2.default.model('User', UserSchema);