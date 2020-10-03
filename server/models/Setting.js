import mongoose, { Schema } from 'mongoose';

const SettingSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    unique: true
  },
  notifications: {
    login: { type: Boolean, default: false },
    questionWritten: { type: Boolean, default: true },
    questionAnswered: { type: Boolean, default: true },
    invitationSent: { type: Boolean, default: true },
    invitationAccepted: { type: Boolean, default: true },
  },
  content: {
    onlyMyMaslak: { type: Boolean, default: false }
  }
}, { timestamps: true });

export default mongoose.model('Setting', SettingSchema);
