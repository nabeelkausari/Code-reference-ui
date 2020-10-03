import mongoose, { Schema } from 'mongoose';

const GroupChatSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  readBy: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    time: Date
  }]
}, { timestamps: true });

export default mongoose.model('GroupChat', GroupChatSchema);
