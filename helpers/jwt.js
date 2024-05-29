import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const createToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  } catch (error) {
    console.error("Error signing the token:", error);
    throw new Error("Token creation failed");
  }
};