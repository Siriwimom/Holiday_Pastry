import express from "express";
import User from "../models/User.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// GET /api/user/me - ดูข้อมูลโปรไฟล์ตัวเอง
router.get("/me", auth, async (req, res) => {
  // หาก JWT payload เป็น { id, email, role } ต้องไป query หา User เพิ่ม
  const user = await User.findById(req.user.id);
  res.json(user);
});

// PUT /api/user/me - เซฟข้อมูลโปรไฟล์ตัวเอง
router.put("/me", auth, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err });
  }
});

export default router;
