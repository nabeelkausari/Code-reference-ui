import mongoose, { Schema } from 'mongoose';

const InviteSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  name: String, //alim's name
  to: String, //emailId
  maslak: String,
  acceptedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Alim'
  },
}, { timestamps: true });

export default mongoose.model('Invite', InviteSchema);
