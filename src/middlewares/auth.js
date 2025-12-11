import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const [type, token] = req.headers.authorization?.split(" ") || [];
  if (!token || type !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
