import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

const toPublicUser = (u) => ({ id: u._id, email: u.email, role: u.role });


/// backend/routes/auth.js
router.post("/register", async (req,res)=>{
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, role: "user" });

  const payload = { sub: user._id.toString(), email: user.email, role: user.role };
  const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
});

router.post("/login", async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid password" });

  const payload = { sub: user._id.toString(), email: user.email, role: user.role };
  const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
});


export default router;
