import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: "error",
        message: "The authentication",
      });
    }
    const { payload } = user;
    if (payload?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        status: "error",
        message: "The authentication is not admin",
      });
    }
  });
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
