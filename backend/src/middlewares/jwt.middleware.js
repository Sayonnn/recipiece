import { verifyToken } from "../utils/jwt";

export const context = async ({ req }) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return {};

  console.log(token);
  if (token) {
    try {
      const decodedToken = verifyToken(token);
      return { id: decodedToken.userId, username: decodedToken.username };
    } catch (error) {
      throw new Error("Authentication failed");
    }
  }

};
