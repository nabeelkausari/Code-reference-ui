'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AccountSchema = new _mongoose.Schema({
  password: String,
  email: { type: String, unique: true },
  isAlim: Boolean,
  isAdmin: Boolean,
  confirmed: Boolean,
  alim: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Alim'
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

AccountSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

AccountSchema.methods = {
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
exports.default = _mongoose2.default.model('Account', AccountSchema);