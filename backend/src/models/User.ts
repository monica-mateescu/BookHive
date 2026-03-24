import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {},
  {
    collection: 'user',
    strict: false,
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

export default model('User', userSchema);
