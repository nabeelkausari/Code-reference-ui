import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types

const IjazaSchema = new Schema({
  account: {
    type: ObjectId,
    ref: 'Account'
  },
  alim: {
    type: ObjectId,
    ref: 'Alim',
  },
  maslak: String,
  type: { type: String, enum: ['POST', 'ANSWER'] },
  requested: { type: Boolean, default: true },
  granted:{
    status: { type: String, enum: ['APPROVED', 'REJECTED', 'ON_HOLD', 'IN_REVIEW', 'CANCELLED', 'WAITING'], default: 'WAITING'},
    by: { type: ObjectId, ref: 'Alim' },
    on: Date,
    note: String
  },
  review: {
    by: { type: ObjectId, ref: 'Alim' },
    on: Date
  }
}, { timestamps: true });

IjazaSchema.index({ account: 1, type: 1 }, { unique: true });

export default mongoose.model('Ijaza', IjazaSchema);
