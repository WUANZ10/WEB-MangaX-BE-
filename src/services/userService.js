import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, genneralAccessToken } from "./jwtService.js";

const userService = {
  createUser: async (userRegister) => {
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
    } catch (error) {
      throw new Error(error.message);
    }
  },
  loginUser: async (userLogin) => {
    const { email, password } = userLogin;

    try {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return {
          status: "error",
          message: "The email is not defined",
        };
      }

      const isPasswordValid = bcrypt.compareSync(
        password,
        existingUser.password
      );

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
  getAllUser: async () => {
    try {
      const allUsers = await User.find();
      return {
        status: "success",
        message: "Users retrieved successfully",
        data: allUsers,
      };
    } catch (error) {
      throw new Error("Failed to retrieve users");
    }
  },
  detailedUser: async (id) => {
    try {
      const user = await User.findOne({ _id: id });

      if (!user) {
        return {
          status: "error",
          message: "User not found",
        };
      }

      return {
        status: "success",
        message: "Successfully retrieved user details",
        data: user,
      };
    } catch (error) {
      throw new Error("Failed to retrieve user details");
    }
  },
};

export default userService;
