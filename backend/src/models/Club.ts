import { model, Schema, Types } from 'mongoose';

const clubSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    meetingLink: { type: String, required: [true, 'Meeting link is required'] },
    meetingDate: { type: Date, required: [true, 'Meeting date is required'] },
    createdBy: { type: Types.ObjectId, ref: 'User', required: [true, 'Creator ID is required'] },
    members: [
      {
        userId: { type: Types.ObjectId, ref: 'User', required: [true, 'Member user ID is required'] },
        role: { type: String, enum: ['member', 'admin'], default: 'member' },
        joinedAt: { type: Date, default: Date.now },
        _id: false
      }
    ],
    maxMembers: { type: Number, default: 10 },
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

clubSchema.index({ bookId: 1, isActive: 1, meetingDate: 1 });
clubSchema.index({ createdBy: 1, isActive: 1, meetingDate: 1 });

export default model('Club', clubSchema);
