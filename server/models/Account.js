import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';

const AccountSchema = new Schema({
  password: String,
  email: { type: String, unique: true },
  isAdmin: Boolean,
  isAlim: Boolean,
  isSenior: Boolean,
  confirmed: Boolean,
  authorizationToPost: Boolean,
  authorizationToAnswer: Boolean,
  settings: {
    type: Schema.Types.ObjectId,
    ref: 'Setting'
  },
  alim: {
    type: Schema.Types.ObjectId,
    ref: 'Alim'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true });

AccountSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
})

AccountSchema.methods = {
  _hashPassword(password) {
    return hashSync(password)
  },
  async comparePassword (candidatePassword) {
    return await compareSync(candidatePassword, this.password)
  }
}
export default mongoose.model('Account', AccountSchema);
