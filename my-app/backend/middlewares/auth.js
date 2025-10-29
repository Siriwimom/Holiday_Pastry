// backend/middlewares/auth.js
import jwt from "jsonwebtoken";

// Middleware สำหรับตรวจสอบ JWT และดึง payload
export const auth = (req, res, next) => {
  try {
    const h = req.headers.authorization || "";
    const token = h.startsWith("Bearer ") ? h.slice(7) : null;
    if (!token) return res.status(401).json({ message: "No token" });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // payload: { id, email, role }
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware สำหรับเช็คว่า user มี role ที่อนุญาต
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
