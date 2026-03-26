import { model, Schema } from 'mongoose';

const bookSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    author: { type: String, required: [true, 'Author is required'] },
    isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
    summary: { type: String, required: [true, 'Summary is required'] },
    image: { type: String, default: null },
    publishedYear: { type: Number, default: null }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export default model('Book', bookSchema);
