import mongoose, { Schema } from 'mongoose';
import sequence from 'mongoose-sequence';
const AutoIncrement = sequence(mongoose);

const CategorySchema = new Schema({
  name: String,
});

CategorySchema.plugin(AutoIncrement, {inc_field: 'categoryId'});

export default mongoose.model('Category', CategorySchema)
