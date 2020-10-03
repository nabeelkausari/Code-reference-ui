import mongoose, { Schema } from 'mongoose';

const AnswerCommentSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  text: String,
}, { timestamps: true });

export default mongoose.model('AnswerComment', AnswerCommentSchema);
