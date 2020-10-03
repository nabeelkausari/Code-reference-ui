import mongoose, { Schema } from 'mongoose';

const GroupChatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  readByReceiver: Boolean,
  readOn: Date,
}, { timestamps: true });

export default mongoose.model('GroupChat', GroupChatSchema);
