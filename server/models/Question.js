import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
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
  text: String,
  maslak: String,
  anonymous: Boolean,
  privateQuestion: Boolean,
  sameMaslakAnswers: { type: Boolean, default: true },
  to: [{
      type: Schema.Types.ObjectId,
      ref: 'Alim'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
}, { timestamps: true });

export default mongoose.model('Question', QuestionSchema);
