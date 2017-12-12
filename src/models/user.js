import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      hidden: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', schema);
