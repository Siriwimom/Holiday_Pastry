// backend/middlewares/auth.js
import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const h = req.headers || {};
  let userId = h["x-user-id"] || h.uid || null;

  const auth = h.authorization || "";
  if (auth.startsWith("Bearer ")) {
    try {
      const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET || "devsecret");
      userId = payload?.sub || userId;
    } catch (e) {
      // เงียบไว้ แล้วค่อยดู x-user-id ต่อ
    }
  }

  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  req.userId = userId;
  next();
}
