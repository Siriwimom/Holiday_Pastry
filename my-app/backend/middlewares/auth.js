import jwt from "jsonwebtoken";

/* =======================================================
   ✅ 1. ตรวจ token ปกติ (ใช้ใน route ที่ต้อง login)
   ======================================================= */
export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
const token = header.startsWith("Bearer ") ? header.slice(7) : null;
if (!token) return res.status(401).json({ message: "No token provided" });


    const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    req.user = { id: decoded.sub, role: decoded.role || "user" };

    return next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/* =======================================================
   ✅ 2. ตรวจ token หรือ header fallback (x-user-id / uid)
   ใช้ใน route ที่ไม่บังคับ login 100% เช่น cart
   ======================================================= */
export const requireAuth = (req, res, next) => {
  const hdrs = req.headers || {};
  const bearer =
    hdrs.authorization && hdrs.authorization.startsWith("Bearer ")
      ? hdrs.authorization.slice(7)
      : null;

  // fallback: เผื่อ front-end ส่ง userId มาแทน token
  const headerUid = hdrs["x-user-id"] || hdrs["uid"];

  if (bearer) {
    try {
      const payload = jwt.verify(bearer, process.env.JWT_SECRET || "devsecret");
      req.user = { _id: payload.sub, role: payload.role || "user" };
      return next();
    } catch (e) {
      console.warn("JWT Verify failed:", e.message);
      // ถ้า verify ไม่ผ่าน จะลองใช้ headerUid ด้านล่าง
    }
  }

  if (headerUid) {
    req.user = { _id: headerUid, role: "user" };
    return next();
  }

  return res.status(401).json({ message: "Unauthorized" });
};

/* =======================================================
   ✅ 3. ตรวจ role (admin หรือ user)
   ใช้ต่อท้าย route ได้เลย เช่น:
   router.get("/admin", auth, requireRole("admin"), handler)
   ======================================================= */
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
