import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: String,
  description: String,
  isPrivate: Boolean,
  inviteLink: String,
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'Member'
  }],
  ulama: [{
    type: Schema.Types.ObjectId,
    ref: 'Member'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'Member'
  }]
}, { timestamps: true });

export default mongoose.model('Group', GroupSchema);
