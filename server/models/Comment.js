import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  alim: {
    type: Schema.Types.ObjectId,
    ref: 'Alim'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  text: String,
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);
