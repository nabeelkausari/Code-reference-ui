import mongoose, { Schema } from 'mongoose';

const AlimCircleSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  alim: {
    type: Schema.Types.ObjectId,
    ref: 'Alim'
  },
  followings: [{
    type: Schema.Types.ObjectId,
    ref: 'Alim'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  alimFollowers: [{
    type: Schema.Types.ObjectId,
    ref: 'Alim'
  }]
}, { timestamps: true });


export default mongoose.model('AlimCircle', AlimCircleSchema);
