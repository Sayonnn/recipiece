import jwt from "jsonwebtoken";
const secret_key = process.env.JWT_SECRET;

export const generateToken = (payload,expires) => {
  if (!secret_key) {
    throw new Error("JWT_SECRET is not defined");
  }
  if (!expires) {
    throw new Error("JWT_EXPIRES is not defined");
  }
  return jwt.sign(payload, secret_key, { expiresIn: expires });
};

export const verifyToken = (token) => {
  try {
    if (!secret_key) {
      throw new Error("JWT_SECRET is not defined");
    }
    return jwt.verify(token, secret_key);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const setCookie = (token) => {


}