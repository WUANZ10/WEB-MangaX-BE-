import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwtService from "./jwtService.js";

const handleUserNotFound = () => ({
  status: "error",
  message: "User not found",
});

const handleSuccessResponse = (message, data = null) => ({
  status: "success",
  message,
  data,
});

const handleErrorResponse = (message) => ({
  status: "error",
  message,
});

const userService = {
  createUser: async (userRegister) => {
    const { username, email, password, confirmPassword } = userRegister;

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return handleErrorResponse("The email is already in use");
      }

      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        username,
        email,
        password: hash,
      });

      return handleSuccessResponse("User created successfully", createdUser);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  loginUser: async (userLogin) => {
    const { email, password } = userLogin;

    try {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return handleErrorResponse("The email is not defined");
      }

      const isPasswordValid = bcrypt.compareSync(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return handleErrorResponse("Invalid password");
      }

      const access_token = await jwtService.generalAccessToken({
        id: existingUser.id,
        isAdmin: existingUser.isAdmin,
      });

      const refresh_token = await jwtService.generateRefreshToken({
        id: existingUser.id,
        isAdmin: existingUser.isAdmin,
      });

      return handleSuccessResponse("User logged in successfully", {
        access_token,
        refresh_token,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUser: async (id, data) => {
    try {
      const existingUser = await User.findOne({ _id: id });

      if (!existingUser) {
        return handleUserNotFound();
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      return handleSuccessResponse("User updated successfully", updatedUser);
    } catch (error) {
      throw new Error("Failed to update user");
    }
  },

  deleteUser: async (id) => {
    try {
      const existingUser = await User.findOne({ _id: id });

      if (!existingUser) {
        return handleUserNotFound();
      }

      await User.findByIdAndDelete(id);
      return handleSuccessResponse("User deleted successfully");
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  },
  getUser: async (id) => {
    try {
      const dataUser = await User.findOne(id);
      if (!dataUser) {
        return {
          message: "identify user",
          status: "error",
        };
      }
      return {
        data: dataUser,
        status: "done",
      };
    } catch (err) {
      return {
        message: "error server",
        status: "error",
      };
    }
  },
  getAllUser: async () => {
    try {
      const allUsers = await User.find();
      return handleSuccessResponse("Users retrieved successfully", allUsers);
    } catch (error) {
      throw new Error("Failed to retrieve users");
    }
  },
  changePassUser: async (data,userId) => {
    try {
      const existingUser = await User.findOne({ _id: userId});
      if (!existingUser) {
        return handleUserNotFound();
      }
      const ComparePass = bcrypt.compareSync(
        data.oldpass,
        existingUser.password
      );
      if (!ComparePass) {
        return {
          message: "Wrong password",
          status: 404,
        };
      }
      const hashNewPass = bcrypt.hashSync(data.newpass, 10);
      existingUser.password = hashNewPass;
      await existingUser.save();
      return handleSuccessResponse("Pass change successfully", existingUser);
    } catch (err) {
      return {
        message: err.message,
        status: 500,
      };
    }
  },
};

export default userService;
