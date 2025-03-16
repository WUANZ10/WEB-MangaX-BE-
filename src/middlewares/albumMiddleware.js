import Joi from "joi";
import { getValidationErrorDetails } from "../utils/validationErr.js";

const createAlbumSchema = Joi.object({
  title: Joi.string().trim().max(255).required(),
  uploader_id: Joi.string().trim().required(),
  artist: Joi.string().trim().max(255).default(""),
  author: Joi.string().trim().max(255).default(""),
  tags: Joi.array().items(Joi.string().trim().max(255)).default([]),
  description: Joi.string().trim().max(1000).default(""),
  cover_image: Joi.string().trim().default(""),
  chapters: Joi.array().items(Joi.string().trim()),
  views: Joi.number().default(0),
  favorites: Joi.number().default(0),
  ratings: Joi.number().default(5),
  status: Joi.string().trim().valid("ongoing", "completed").default("ongoing"),
});

export const validateCreateAlbumRequest = async (req, res, next) => {
  try {
    await createAlbumSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      details: getValidationErrorDetails(error),
    });
  }
};

const updateAlbumSchema = Joi.object({
  title: Joi.string().trim().max(255),
  uploader_id: Joi.string().trim(),
  artist: Joi.string().trim().max(255),
  author: Joi.string().trim().max(255),
  tags: Joi.array().items(Joi.string().trim().max(255)),
  description: Joi.string().trim().max(1000),
  cover_image: Joi.string().trim(),
  chapters: Joi.array().items(Joi.string().trim()),
  views: Joi.number(),
  favorites: Joi.number(),
  ratings: Joi.number(),
  status: Joi.string().trim().valid("ongoing", "completed"),
});

export const validateUpdateAlbumRequest = async (req, res, next) => {
  try {
    await updateAlbumSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      details: getValidationErrorDetails(error),
    });
  }
};
