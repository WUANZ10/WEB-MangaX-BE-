import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtService = {
  genneralAccessToken: async (payload) => {
    try {
      const access_token = jwt.sign({ payload }, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      return access_token;
    } catch (error) {
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
      throw new Error("Failed to generate refresh token");
    }
  },

  refreshToken: async (token) => {
    try {
      const user = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
          if (err) {
            console.error("JWT verify error:", err);
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });

      const { payload } = user;
      const access_token = await jwtService.genneralAccessToken({
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
      throw new Error("Failed to refresh token");
    }
  },
};

export default jwtService;
