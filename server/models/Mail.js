import mongoose, { Schema } from 'mongoose';

const MailSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  from: String,
  to: String,
  body: String,
  subject: String
}, { timestamps: true });

export default mongoose.model('Mail', MailSchema)
