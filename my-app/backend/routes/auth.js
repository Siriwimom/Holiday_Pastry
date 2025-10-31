// backend/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// debug route ไว้เช็คว่าไฟล์นี้ถูก mount แล้วจริงไหม
router.get("/ping", (req, res) => res.json({ ok: true, where: "auth" }));

router.post("/login", async (req, res) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";
    if (!email || !password) return res.status(400).json({ message: "email and password are required" });

    const u = await User.findOne({ email }).select("+passwordHash");
    if (!u) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, u.passwordHash || "");
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { sub: u._id.toString(), role: u.role || "user" },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "7d" }
    );

    res.json({ user: { _id: u._id, email: u.email, name: u.name || "", role: u.role || "user" }, token });
  } catch (e) {
    console.error("login error:", e);
    res.status(500).json({ message: "Login failed" });
  }
});

// ===== NEW: ตรวจสอบอีเมล =====
router.post("/check-email", async (req, res) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    if (!email) return res.status(400).json({ ok:false, message:"Email is required" });

    const u = await User.findOne({ email });
    if (!u) return res.json({ ok:true, exists:false });

    return res.json({ ok:true, exists:true, email: u.email, id: u._id });
  } catch (e) {
    console.error("check-email error:", e);
    res.status(500).json({ ok:false, message:"Check email failed" });
  }
});

// ===== NEW: รีเซ็ตรหัสผ่าน =====
router.post("/reset-password", async (req, res) => {
  try {
    console.log("RESET body:", req.body); // ← ดูจริงว่ามาอะไร

    const email = (req.body?.email || "").trim().toLowerCase();
    // รองรับทั้ง newPassword และ password (กันตกหล่น)
    const pwd = (req.body?.newPassword ?? req.body?.password)?.toString() || "";

    if (!email || !pwd) {
      return res.status(400).json({ message: "Email and newPassword are required" });
    }

    const u = await User.findOne({ email });
    if (!u) return res.status(404).json({ message: "User not found" });

    u.passwordHash = await bcrypt.hash(pwd, 10);
    await u.save();
    return res.json({ ok: true, message: "Password reset successful" });
  } catch (e) {
    console.error("reset-password error:", e);
    res.status(500).json({ message: "reset password failed" });
  }
});


router.post("/register", async (req, res) => {
  try {
    const name = req.body?.name || "";
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const exist = await User.findOne({ email });
    if (exist) return res.status(409).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash, role: "user" });
    res.json({ ok: true, user: { id: user._id, name: user.name || "", email: user.email, role: user.role } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Register failed" });
  }
});



export default router;
