import { model, Schema, Types } from 'mongoose';

const messageSchema = new Schema(
  {
    clubId: { type: Types.ObjectId, ref: 'Club', required: [true, 'Club ID is required'] },
    senderId: { type: Types.ObjectId, ref: 'User', required: [true, 'Sender ID is required'] },
    text: { type: String, required: [true, 'Message text is required'] }
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

messageSchema.index({ clubId: 1, createdAt: 1 });

export default model('Message', messageSchema);
