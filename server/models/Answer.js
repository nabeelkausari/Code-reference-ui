import mongoose, { Schema } from 'mongoose';

const AnswerSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  alim: {
    type: Schema.Types.ObjectId,
    ref: 'Alim'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  text: String,
  userRead: Boolean,
  readOn: Date,
  userVoted: Boolean,
  commentsDisabled: Boolean,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]
}, { timestamps: true });

export default mongoose.model('Answer', AnswerSchema);
