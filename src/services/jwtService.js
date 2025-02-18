import jwt from "jsonwebtoken";

export const genneralAccessToken = async (payload) => {
  console.log(payload);
  try {
    const access_token = jwt.sign({ payload }, "access_token", {
      expiresIn: "1h",
    });
    return access_token;
  } catch (error) {
    throw new Error("Failed to generate access token");
  }
};

export const generateRefreshToken = async (payload) => {
  const refresh_token = jwt.sign({ payload }, "refresh_token", {
    expiresIn: "365d",
  });

  return refresh_token;
};
