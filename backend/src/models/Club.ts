import { model, Schema, Types } from 'mongoose';

const clubSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    mettingLink: { type: String, required: [true, 'Meeting link is required'] },
    mettingDate: { type: Date, required: [true, 'Meeting date is required'] },
    createdBy: { type: Types.ObjectId, ref: 'User', required: [true, 'Creator ID is required'] },
    members: [{ type: Types.ObjectId, ref: 'User' }],
    bookId: { type: Types.ObjectId, ref: 'Book', required: [true, 'Book ID is required'] },
    isActive: { type: Boolean, default: true }
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

export default model('Club', clubSchema);
