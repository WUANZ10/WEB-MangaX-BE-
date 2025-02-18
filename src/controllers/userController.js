import {
  createUserService,
  loginUserService,
} from "../services/userService.js";

export const createUser = async (req, res) => {
  try {
    // console.log(req.body);

    const { username, email, password, confirmPassword } = req.body;

    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isEmailValid = emailRegex.test(email);

    if (!username || !email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "error",
        message: "All fields are required",
      });
    }

    if (!isEmailValid) {
      return res.status(200).json({
        status: "error",
        message: "Invalid email format",
      });
    }

    if (password !== confirmPassword) {
      return res.status(200).json({
        status: "error",
        message: "Password and confirm password do not match",
      });
    }

    const response = await createUserService(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    // console.log(req.body);

    const { username, email, password, confirmPassword } = req.body;

    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isEmailValid = emailRegex.test(email);

    if (!username || !email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "error",
        message: "All fields are required",
      });
    }

    if (!isEmailValid) {
      return res.status(200).json({
        status: "error",
        message: "Invalid email format",
      });
    }

    if (password !== confirmPassword) {
      return res.status(200).json({
        status: "error",
        message: "Password and confirm password do not match",
      });
    }

    const response = await loginUserService(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
