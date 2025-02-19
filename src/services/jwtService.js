import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const genneralAccessToken = async (payload) => {
  console.log(payload);
  try {
    const access_token = jwt.sign({ payload }, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });
    return access_token;
  } catch (error) {
    throw new Error("Failed to generate access token");
  }
};

export const generateRefreshToken = async (payload) => {
  const refresh_token = jwt.sign({ payload }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });

  return refresh_token;
};
