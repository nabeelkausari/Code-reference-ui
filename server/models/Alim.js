import mongoose, { Schema } from 'mongoose';

const AlimSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    unique: true
  },
  fullName: String,
  avatar: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  gender: String,
  dob: Date,
  maslak: String,
  circle: {
    type: Schema.Types.ObjectId,
    ref: 'AlimCircle'
  },
  cover: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  level: String,
  titles: {
    preName: [String],
    postName: [String]
  },
  education: [{
    course: String,
    institute: String,
    period: {
      from: Date,
      to: Date,
    }
  }],
  experience: [{
    designation: String,
    workplace: {
      type: String, // Masjid or Madrasah
      name: String
    },
    period: {
      from: Date,
      to: Date,
    }
  }],
}, { timestamps: true });

export default mongoose.model('Alim', AlimSchema);
