import mongoose, { Schema } from 'mongoose';

const PrivateRoomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  other: {
    type: Schema.Types.ObjectId,
    ref: 'Member'
  },
  accepted: Boolean,
  chat: [{
    type: Schema.Types.ObjectId,
    ref: 'PrivateChat'
  }]
}, { timestamps: true });

PrivateRoomSchema.index({ user: 1, other: 1 }, { unique: true });

export default mongoose.model('PrivateRoom', PrivateRoomSchema);

