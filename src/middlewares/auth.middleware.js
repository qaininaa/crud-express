import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  if (!authHeader?.startsWith("Bearer "))
    return res.status(400).json({ message: "Incorrect formating" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ Message: "Token is expired" });
    }
    req.user = user;
    next();
  });
};
