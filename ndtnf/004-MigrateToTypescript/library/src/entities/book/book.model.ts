import { model, Schema, Document } from 'mongoose';
import { IBook } from './book.interface'

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

export const BookModel = model<IBook & Document>('Book', bookSchema)