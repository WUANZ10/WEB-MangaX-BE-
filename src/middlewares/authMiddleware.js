import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Album from "../models/albumModel.js";
import jwtService from "../services/jwtService.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const data = jwtService.verifyAccessToken(token.replace("Bearer ", ""));

  if (!data.valid) {
    return res.status(401).json({ message: `Unauthorized: ${data.message}` });
  }

  const { decoded } = data;
  req.user = decoded.payload;
  next();
};

export const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params.id;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Access token is missing",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "error",
          message: "Access token has expired",
        });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          status: "error",
          message: "Invalid access token",
        });
      } else {
        return res.status(401).json({
          status: "error",
          message: "Authentication failed",
        });
      }
    }

    const { payload } = user;
    if (payload?.isAdmin || payload?.id === userId) {
      next();
    } else {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to access this resource",
      });
    }
  });
};

export const authAdminMiddleware = (req, res, next) => {
  const user = req.user;

  if (!user?.isAdmin) {
    return res.status(403).json({
      status: "error",
      message: "Forbidden: You do not have admin privileges",
    });
  }

  next();
};

export const authUploaderMiddleware = async (req, res, next) => {
  const albumId = req.params.id;
  const userId = req.user.id;

  try {
    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (album.uploader_id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not the uploader of this album" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
