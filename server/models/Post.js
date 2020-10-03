import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  alim: {
    type: Schema.Types.ObjectId,
    ref: 'Alim'
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  maslak: String,
  text: String,
  meta: {
    url: String,
    title: String,
    description: String,
    image: String
  },
  commentsDisabled: Boolean,
  sameMaslakComments: { type: Boolean, default: true },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
