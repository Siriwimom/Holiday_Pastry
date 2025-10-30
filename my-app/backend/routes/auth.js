import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ✅ Debug route
router.get("/ping", (req, res) => res.json({ ok: true, where: "auth" }));

// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const name = req.body?.name || "";
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(409).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      role: "user",
    });

    res.json({
      ok: true,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    console.error("Register error:", e);
    res.status(500).json({ message: "Register failed" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const u = await User.findOne({ email }).select("+passwordHash");
    if (!u) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, u.passwordHash || "");
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { sub: u._id.toString(), role: u.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      user: { _id: u._id, email: u.email, name: u.name, role: u.role },
      token,
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: "Login failed" });
  }
});

// ✅ Reset Password (เพิ่มส่วนนี้เข้าไป)
router.post("/reset-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // ตรวจสอบค่าที่ส่งมา
    if (!email || !oldPassword || !newPassword)
      return res.status(400).json({ message: "Missing required fields" });

    // หา user จาก email
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    // ตรวจรหัสผ่านเดิม
    const match = await bcrypt.compare(oldPassword, user.passwordHash || "");
    if (!match)
      return res.status(400).json({ message: "Current password is incorrect" });

    // เข้ารหัสรหัสผ่านใหม่
    const newHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newHash;
    await user.save();

    res.json({ ok: true, message: "Password changed successfully" });
  } catch (e) {
    console.error("reset-password error:", e);
    res.status(500).json({ message: "Password change failed" });
  }
});

export default router;
