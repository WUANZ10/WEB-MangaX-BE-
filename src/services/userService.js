import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, genneralAccessToken } from "./jwtService.js";

export const createUserService = async (userRegister) => {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUserService = async (userLogin) => {
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
