import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Post', schema);
