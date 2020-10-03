import mongoose, { Schema } from 'mongoose';

const CounterSchema = Schema({
  id: {type: String, required: true},
  seq: { type: Number }
});

export default mongoose.model('Counter', CounterSchema);
