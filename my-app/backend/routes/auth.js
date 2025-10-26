// backend/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// debug route ไว้เช็คว่าไฟล์นี้ถูก mount แล้วจริงไหม
router.get("/ping", (req, res) => res.json({ ok: true, where: "auth" }));

// ===== LOGIN (ของเดิมคุณใช้อยู่ได้) =====
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
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

    res.json({
      user: { _id: u._id, email: u.email, name: u.name || "", role: u.role || "user" },
      token
    });
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
    const { email, newPassword, password } = req.body || {};
    const pwd = (newPassword ?? password)?.toString();

    if (!email || !pwd) {
      return res.status(400).json({ message: "Email and newPassword are required" });
    }

    const u = await User.findOne({ email });
    if (!u) return res.status(404).json({ message: "Email not found" });

    u.passwordHash = await bcrypt.hash(pwd, 10);
    await u.save();

    return res.json({ ok: true, message: "Password updated successfully" });
  } catch (e) {
    console.error("reset-password error:", e, "body=", req.body);
    res.status(500).json({ message: "reset password failed" });
  }
});

export default router;
