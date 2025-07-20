import User from '../models/User';
import AppError from '../utils/appError';

export const updateUserProfile = async (userId: string, updateData: any) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true
  });

  if (!user) {
    throw new AppError('No user found with that ID', 404);
  }

  return user;
};

export const deleteUserAccount = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { active: false });
};