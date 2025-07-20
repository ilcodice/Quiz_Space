import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';


interface IUser extends Document {
  user_name: string;
  email: string;
  password: string;
  verified: boolean;
  profile_image: string;
  bio: string;
  location: string;
  comparePassword(candidatePassword: string): Promise<boolean>; // ✅ add this
}

const UserSchema: Schema = new Schema<IUser>(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please enter a valid email'] },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    profile_image: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
  }, { timestamps: true }
);
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel: Model<IUser> = 
  mongoose.models && mongoose.models.User 
    ? mongoose.models.User 
    : mongoose.model<IUser>('User', UserSchema);

export default UserModel;
