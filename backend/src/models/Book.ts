import { Model, model, Schema } from 'mongoose';
import { generateSlug } from '#utils';

const bookSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    author: { type: String, required: [true, 'Author is required'] },
    slug: { type: String, unique: true, index: true },
    isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
    summary: { type: String, required: [true, 'Summary is required'] },
    image: { type: String, default: null },
    publishedYear: { type: Number, default: null },
    isActive: { type: Boolean, default: false }
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

bookSchema.pre('save', async function () {
  if (this.isModified('title')) {
    this.slug = await generateSlug({
      model: this.constructor as Model<any>,
      sourceValue: this.title,
      excludeId: this._id.toString()
    });
  }
});

export default model('Book', bookSchema);
