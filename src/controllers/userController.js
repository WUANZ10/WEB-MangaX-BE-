import userService from "../services/userService.js";
import jwtService from "../services/jwtService.js";
import {
  validateLoginRequest,
  validateRegisterRequest,
} from "../middlewares/userMiddleware.js";

const handleError = (res, error, statusCode = 404) => {
  return res.status(statusCode).json({ message: error.message });
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const userController = {
  createUser: async (req, res) => {
    try {
      await validateRegisterRequest(req, res, async () => {
        const { username, email, password, confirmPassword } = req.body;

        if (!validateEmail(email)) {
          return res
            .status(400)
            .json({ status: "error", message: "Invalid email format" });
        }

        if (password !== confirmPassword) {
          return res
            .status(400)
            .json({
              status: "error",
              message: "Password and confirm password do not match",
            });
        }

        const response = await userService.createUser(req.body);
        return res.status(200).json(response);
      });
    } catch (error) {
      return handleError(res, error);
    }
  },

  loginUser: async (req, res) => {
    try {
      await validateLoginRequest(req, res, async () => {
        const response = await userService.loginUser(req.body);
        if (response.status === "error") {
          return res.status(401).json(response);
        }
        return res.status(200).json(response);
      });
    } catch (error) {
      return handleError(res, error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const data = req.body;

      if (!userId) {
        return res
          .status(400)
          .json({ status: "error", message: "The userId is required" });
      }

      const response = await userService.updateUser(userId, data);
      return res.status(200).json(response);
    } catch (error) {
      return handleError(res, error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res
          .status(400)
          .json({ status: "error", message: "The userId is required" });
      }

      const response = await userService.deleteUser(userId);
      return res.status(200).json(response);
    } catch (error) {
      return handleError(res, error);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const response = await userService.getAllUser();
      return res.status(200).json(response);
    } catch (error) {
      return handleError(res, error);
    }
  },

  detailedUser: async (req, res) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res
          .status(400)
          .json({ status: "error", message: "The userId is required" });
      }

      const response = await userService.detailedUser(userId);
      return res.status(200).json(response);
    } catch (error) {
      return handleError(res, error);
    }
  },

  refreshToken: async (req, res) => {
    try {
      const token = req.headers.token?.split(" ")[1];

      if (!token) {
        return res
          .status(400)
          .json({ status: "error", message: "The token is required" });
      }

      const response = await jwtService.refreshToken(token);
      return res.status(200).json(response);
    } catch (error) {
      return handleError(res, error);
    }
  },
};

export default userController;
