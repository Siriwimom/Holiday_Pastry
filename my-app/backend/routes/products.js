// backend/routes/products.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const router = express.Router();

// สร้างโฟลเดอร์ uploads ถ้ายังไม่มี
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ตั้งค่า multer (เก็บไฟล์ลง /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({ storage });

// ---------- LIST ----------
router.get("/", async (req, res) => {
  try {
    const rows = await Product.find().sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) {
    console.error("GET /products error:", e);
    res.status(500).json({ message: e.message });
  }
});

// ---------- GET BY ID ----------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid id");
    const doc = await Product.findById(id);
    if (!doc) return res.status(404).send("Not found");
    res.json(doc);
  } catch (e) {
    console.error("GET /products/:id error:", e);
    res.status(500).json({ message: e.message });
  }
});

// ---------- CREATE ----------
router.post(
  "/",
  upload.fields([
    { name: "imageMain", maxCount: 1 },
    { name: "imageSide", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { name, price, category, description } = req.body;

      const main = req.files?.imageMain?.[0]
        ? `/uploads/${req.files.imageMain[0].filename}`
        : "";

      const sides = Array.isArray(req.files?.imageSide)
        ? req.files.imageSide.map((f) => `/uploads/${f.filename}`)
        : [];

      const doc = await Product.create({
        name,
        price: Number(price) || 0,
        category,
        description: description || "",
        imageMain: main,
        imageSide: sides,
      });

      res.status(201).json(doc);
    } catch (e) {
      console.error("POST /products error:", e);
      res.status(500).json({ message: e.message });
    }
  }
);

export default router;
