import mongoose, { Schema } from 'mongoose';

const LogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  actions: [String],
  error: String
}, { timestamps: true });

export default mongoose.model('Log', LogSchema)
