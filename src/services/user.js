import User from "../models/user.js";
import NotFoundError from "../errors/not-found-error.js";

const createUser = async (userData) => {
  const user = await User.create(userData);
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const getAllUsers = async () => {
  // TODO: Add pagination
  const users = await User.find();
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const updateUser = async (userId, userData) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      ...(userData.name && { name: userData.name }),
      ...(userData.email && { email: userData.email }),
      ...(userData.password && { password: userData.password }),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return { message: "User deleted successfully" };
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
