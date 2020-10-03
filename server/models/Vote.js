import mongoose, { Schema } from 'mongoose';

const VoteSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
}, { timestamps: true });

export default mongoose.model('Vote', VoteSchema);
