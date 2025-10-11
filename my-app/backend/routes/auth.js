import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


const r = Router();

// POST /api/auth/register
r.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email & password required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name: name || "", passwordHash });

  const token = jwt.sign({ uid: user._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
});

// POST /api/auth/login
r.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ uid: user._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
});

export default r;
