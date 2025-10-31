import jwt from "jsonwebtoken";

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
  }
  if (headerUid) {
    req.user = { _id: headerUid, role: "user" };
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}
