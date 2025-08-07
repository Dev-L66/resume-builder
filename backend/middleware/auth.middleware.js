import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded);
      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized." });
      }
      console.log(req.userId, decoded.userId);
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(401).json({ message: "Token not found." });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};
