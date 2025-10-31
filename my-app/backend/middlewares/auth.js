import jwt from "jsonwebtoken";

// ✅ ตรวจ token
export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
export function requireAuth(req, res, next) {
  const hdrs = req.headers || {};
  const bearer = hdrs.authorization && hdrs.authorization.startsWith("Bearer ")
    ? hdrs.authorization.slice(7) : null;

  // รองรับ fallback x-user-id แบบที่ใช้กับ cart
  const headerUid = hdrs["x-user-id"] || hdrs["uid"];

  if (bearer) {
    try {
      const payload = jwt.verify(bearer, process.env.JWT_SECRET || "devsecret");
      req.user = { _id: payload.sub, role: payload.role || "user" };
      return next();
    } catch (e) {
      // แค่ลอง headerUid ต่อ
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.sub, role: decoded.role };

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireAuth = auth;

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
  if (headerUid) {
    req.user = { _id: headerUid, role: "user" };
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}
