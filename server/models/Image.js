import mongoose, { Schema } from 'mongoose';

const ImageSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  img: {
    data: Buffer,
    contentType: String
  }
},{ timestamps: true })

export default mongoose.model('Image', ImageSchema)
