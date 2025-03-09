import Joi from "joi";
import { getValidationErrorDetails } from "../utils/validationErr.js";

const registerSchema = Joi.object({
  username: Joi.string().trim().max(255).required(),
  email: Joi.string().trim().email().max(255).required(),
  password: Joi.string().trim().min(3).max(100).required(),
  confirmPassword: Joi.string().trim().min(3).max(100).required(),
});

export const validateRegisterRequest = async (req, res, next) => {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      details: getValidationErrorDetails(error),
    });
  }
};

const loginSchema = Joi.object({
  email: Joi.string().trim().email().max(255).required(),
  password: Joi.string().trim().min(3).max(100).required(),
});

export const validateLoginRequest = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      details: getValidationErrorDetails(error),
    });
  }
};
