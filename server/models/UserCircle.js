import mongoose, { Schema } from 'mongoose';

const UserCircleSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  followings: [{
    type: Schema.Types.ObjectId,
    ref: 'Alim'
  }]
}, { timestamps: true });


export default mongoose.model('UserCircle', UserCircleSchema);
