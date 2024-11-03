import { model, Schema } from 'mongoose';

const bookSchema = new Schema(
  {
  id:          { type: String, required: true, unique: true },
  title:       { type: String, required: true   },
  description: { type: String, required: true },
  authors:     { type: String, required: true },
  favorite:    { type: String },
  fileCover:   { type: String },
  fileName:    { type: String },
});

const Book = model('Book', bookSchema);

export default Book;