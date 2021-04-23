import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const ContactSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    mobile: {
      type: String,
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      lowercase: true,
      trim: true,
    },
    designation: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      lowercase: true,
      trim: true,
    },
    website: {
      type: String,
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    social: {
      youtube: String,
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String,
    },
  },
  { collection: 'contacts' }
);

ContactSchema.plugin(timestamps);
export default mongoose.model('Contact', ContactSchema);
