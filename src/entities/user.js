import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';

export const UserSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: [true, 'Email is required']
		},
		username: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: [true, 'Username is required']
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			bcrypt: true
		},
		name: {
			type: String,
			trim: true,
		}
	},
	{ collection: 'users' }
)

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

UserSchema.index({ email: 1, username: 1 });

module.exports = exports = mongoose.model('User', UserSchema);
