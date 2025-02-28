import userService from "../services/userService.js";
const userController = {
  createUser: async (req, res) => {
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

      const response = await userService.createUser(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
  },
  loginUser: async (req, res) => {
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
  },
  updateUser: async (req, res) => {
    try {
      const data=req.body
      if (!data._id) {
        return res.status(200).json({
          status: "error",
          message: "The userId is required",
        });
      }
      const response = await userService.updateUser(data._id,data);
      return res.done(response.data)
    } catch (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
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
  getUser: async (req, res) => {
    try {
      const userId = req.body;
      const response = await userService.getUser(userId);
      return res.done(response.data);
    } catch (err) {
      return res.serverErorr({ err });
    }
  },
};

export default userController;
