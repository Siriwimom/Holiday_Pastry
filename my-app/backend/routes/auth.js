// backend/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// ---------- LOGIN ----------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    // ดึงทั้ง passwordHash และ password (เผื่อโปรเจกต์เก่าใช้คนละชื่อ/แบบ)
    const u = await User.findOne({ email }).select("+passwordHash +password");
    if (!u) return res.status(401).json({ message: "Invalid credentials" });

    // รองรับ 3 เคส:
    // 1) passwordHash (ปกติ)  2) password ที่เป็น hash  3) password เป็น plain-text (ของเก่า)
    let ok = false;

    if (u.passwordHash) {
      ok = await bcrypt.compare(password, u.passwordHash);
    } else if (u.password) {
      // ลองเทียบกับ hash; ถ้าไม่ใช่ hash จริง ก็ fallback เทียบตรง ๆ (plain-text)
      try {
        ok = await bcrypt.compare(password, u.password);
      } catch {
        ok = password === u.password;
      }
    }

    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { sub: u._id.toString(), role: u.role || "user" },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "7d" }
    );

    return res.json({
      user: { _id: u._id, email: u.email, name: u.name || "", role: u.role || "user" },
      token,
    });
  } catch (e) {
    console.error("login error:", e);
    return res.status(500).json({ message: "Login failed" });
  }
});

// ---------- REGISTER (ปกติ) ----------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, role: "user", passwordHash: hash });
    res.json({ message: "Registered successfully", user });
  } catch (e) {
    console.error("register error:", e);
    res.status(500).json({ message: "Register failed" });
  }
});

// ---------- DEV ONLY: สร้าง/รีเซ็ตรหัสแอดมิน ----------
router.post("/seed-admin", async (req, res) => {
  try {
    const email = req.body?.email || "admin@site.com";
    const name = req.body?.name || "Admin";
    const plain = req.body?.password || "123456";

    const hash = await bcrypt.hash(plain, 10);

    const prev = await User.findOne({ email });
    const up = await User.findOneAndUpdate(
      { email },
      { email, name, role: "admin", passwordHash: hash, $unset: { password: 1 } }, // ล้างฟิลด์ password เก่า
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      ok: true,
      message: prev ? "Admin updated" : "Admin created",
      email: up.email,
    });
  } catch (e) {
    console.error("seed-admin error:", e);
    res.status(500).json({ message: "seed-admin failed" });
  }
});

export default router;
