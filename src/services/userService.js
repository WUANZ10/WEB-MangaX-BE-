import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, genneralAccessToken } from "./jwtService.js";

export const createUser = async (userRegister) => {
  const { username, email, password, confirmPassword } = userRegister;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        status: "error",
        message: "The email is already in use",
      };
    }

    const hash = bcrypt.hashSync(password, 10);
    console.log("hash", hash);

    const createdUser = await User.create({
      username,
      email,
      password: hash,
    });

    if (createdUser) {
      return {
        status: "success",
        message: "User created successfully",
        data: createdUser,
      };
    }
<<<<<<< Updated upstream
  } catch (error) {
    throw new Error(error.message);
=======
  },
  updateUser: async (id, data) => {
    try {
      const existingUser = await User.findOne({ _id: id });

      if (!existingUser) {
        return {
          status: "error",
          message: "User not found",
        };
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      return {
        status: "success",
        message: "User updated successfully",
        data: updatedUser,
      };
    } catch (error) {
      throw new Error("Failed to update user");
    }
  },
  deleteUser: async (id) => {
    try {
      const existingUser = await User.findOne({ _id: id });

      if (!existingUser) {
        return {
          status: "error",
          message: "User not found",
        };
      }

      const deletedUser = await User.findByIdAndDelete(id);
      console.log("deletedUser", deletedUser);
      return {
        status: "success",
        message: "User deleted successfully",
      };
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  },
  listProfile:async(id)=>{
    const data=await User.findOne({id})
>>>>>>> Stashed changes
  }
};

export const loginUser = async (userLogin) => {
  const { email, password } = userLogin;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return {
        status: "error",
        message: "The email is not defined",
      };
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordValid) {
      return {
        status: "error",
        message: "Invalid password",
      };
    }

    const access_token = await genneralAccessToken({
      id: existingUser.id,
      isAdmin: existingUser.isAdmin,
    });

    const refresh_token = await generateRefreshToken({
      id: existingUser.id,
      isAdmin: existingUser.isAdmin,
    });

    return {
      status: "success",
      message: "User logged in successfully",
      access_token,
      refresh_token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (id, data) => {
  try {
    const existingUser = await User.findOne({ _id: id });

    if (!existingUser) {
      return {
        status: "error",
        message: "User not found",
      };
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    console.log("updatedUser", updatedUser);
    return {
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    throw new Error("Failed to update user");
  }
};
