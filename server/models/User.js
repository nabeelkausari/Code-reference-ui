import mongoose, { Schema } from 'mongoose';
import { hashSync, compare } from 'bcrypt-nodejs';

const UserSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    unique: true
  },
  fullName: String,
  avatar: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  gender: String,
  dob: Date,
  maslak: String,
  circle: {
    type: Schema.Types.ObjectId,
    ref: 'UserCircle'
  },
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
})

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password)
  },
  async comparePassword (candidatePassword) {
    return await compare(candidatePassword, this.password)
  }
}
export default mongoose.model('User', UserSchema);
