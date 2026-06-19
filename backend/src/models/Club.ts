import { Model, model, Schema, Types } from 'mongoose';
import { generateSlug } from '#utils';

const clubSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    slug: { type: String, unique: true, index: true },
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
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    image: { type: String, default: null }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

clubSchema.index({ createdBy: 1, meetingDate: 1 });
clubSchema.index({ 'members.userId': 1, meetingDate: 1 });
clubSchema.index({ status: 1, meetingDate: 1 });

clubSchema.pre('save', async function () {
  if (this.isModified('name')) {
    this.slug = await generateSlug({
      model: this.constructor as Model<any>,
      sourceValue: this.name,
      excludeId: this._id.toString()
    });
  }
});

export default model('Club', clubSchema);
