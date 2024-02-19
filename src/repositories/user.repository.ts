import { UserModel } from "../databases/models/user.models";

export const createUser = async (user) => {
    try {
      const newUser = await UserModel.create(user);
      console.log(newUser);
      return newUser;
    }
    catch (error) {
      throw new error('Error creating user Repository');
    }
}

export const findUserByEmail = async (email) => {
  try {
    const user = await UserModel.find({ email })
    return user
  } catch (error) {
    throw error
  }
}

export const getAllUsers = async () => {
  try {
    const getAllUsers = await UserModel.find()
    return getAllUsers
  } catch (error) {
    throw new error('Error getting all users');
  }
}