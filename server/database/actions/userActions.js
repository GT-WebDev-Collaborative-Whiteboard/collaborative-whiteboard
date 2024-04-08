import User from '../models/userModel.js';

export async function createUser(userData) {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const result = await User.deleteOne({ _id: userId });
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function updateUser(userId, newUserData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, newUserData, { new: true });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
