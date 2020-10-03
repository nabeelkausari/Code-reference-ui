import mongoose, { Schema } from 'mongoose';

const MemberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  active: Boolean,
  leftOn: Date
}, { timestamps: true });

MemberSchema.index({ user: 1, group: 1 }, { unique: true });

export default mongoose.model('Member', MemberSchema);
