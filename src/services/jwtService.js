import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtService = {
  generalAccessToken: async (payload) => {
    try {
      const access_token = jwt.sign({ payload }, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      return access_token;
    } catch (error) {
      console.error("Error generating access token:", error);
      throw new Error("Failed to generate access token");
    }
  },

  generateRefreshToken: async (payload) => {
    try {
      const refresh_token = jwt.sign({ payload }, process.env.REFRESH_TOKEN, {
        expiresIn: "365d",
      });
      return refresh_token;
    } catch (error) {
      console.error("Error generating refresh token:", error);
      throw new Error("Failed to generate refresh token");
    }
  },

  refreshToken: async (token) => {
    try {
      const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN);
      const { payload } = decoded;

      const access_token = await jwtService.generalAccessToken({
        id: payload?.id,
        isAdmin: payload?.isAdmin,
      });

      console.log("New access token:", access_token);

      return {
        status: "success",
        message: "Successfully refreshed token",
        access_token,
      };
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw new Error("Failed to refresh token");
    }
  },

  verifyAccessToken: (token) => {
    if (!token) {
      return { valid: false, message: "No token provided" };
    }

    try {
      const actualToken = token.replace("Bearer ", "");
      const decoded = jwt.verify(actualToken, process.env.ACCESS_TOKEN);
      return { valid: true, decoded };
    } catch (error) {
      console.error("Error verifying access token:", error);
      return {
        valid: false,
        message: "Invalid access token",
        error: error.message,
      };
    }
  },

  verifyRefreshToken: (token) => {
    if (!token) {
      return { valid: false, message: "No token provided" };
    }

    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
      return { valid: true, decoded };
    } catch (error) {
      console.error("Error verifying refresh token:", error);
      return {
        valid: false,
        message: "Invalid refresh token",
        error: error.message,
      };
    }
  },
};

export default jwtService;
