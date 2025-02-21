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
