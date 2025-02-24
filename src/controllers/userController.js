import * as userService from "../services/userService.js";

export const createUser = async (req, res) => {
  try {
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
<<<<<<< Updated upstream

    const response = await userService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
=======
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(200).json({
          status: "error",
          message: "The userId is required",
        });
      }
      const response = await userService.deleteUser(userId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
  },
  listProfile:async(req,res)=>{
    try{
      const response = await userService.listProfile(req.body);
    }catch(error){
      return res.status(404).send({
        message:error.message
      })
    }
>>>>>>> Stashed changes
  }
};

export const loginUser = async (req, res) => {
  try {
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

    const response = await userService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "error",
        message: "The userId is required",
      });
    }
    const response = await userService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
