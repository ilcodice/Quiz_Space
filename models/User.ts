import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';


interface IUser extends Document {
  user_name: string;
  email: string;
  password: string;
  verified: boolean;
  profile_image: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please enter a valid email'] },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    profile_image: { type: String, default: '' },
  }
);
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel: Model<IUser> = 
  mongoose.models && mongoose.models.User 
    ? mongoose.models.User 
    : mongoose.model<IUser>('User', UserSchema);

export default UserModel;
