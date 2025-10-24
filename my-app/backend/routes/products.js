// backend/routes/products.js
import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Product from "../models/Product.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// GET list
router.get("/", async (req, res) => {
  try {
    const rows = await Product.find().sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET by id (เหมือนเดิม)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid id");
    const doc = await Product.findById(id);
    if (!doc) return res.status(404).send("Not found");
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// ✅ POST create (รับไฟล์)
router.post(
  "/",
  upload.fields([
    { name: "imageMain", maxCount: 1 },
    { name: "imageSide", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { name, price, category, description } = req.body;

      const base = process.env.PUBLIC_BASE_URL || "http://localhost:5000";
      const imageMainUrl = req.file ? `${base}/uploads/${req.file.filename}` : "";
      const imageSideUrls = (req.files?.imageSide || []).map(f => `${base}/uploads/${f.filename}`);


      const doc = await Product.create({
        name,
        price,
        category,
        description,
        imageMainUrl,
        imageSideUrls,
      });

      res.json(doc);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }
);



// ✅ DELETE (มีอยู่แล้ว ถ้ายังไม่มี ใส่ตัวนี้)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "invalid id" });
    }

    const doc = await Product.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ message: "not found" });

    // ถ้าคุณเก็บเป็น URL เช่น http://localhost:5000/uploads/xxx.png ก็ลบไฟล์ทิ้งให้
    const unlinkIfLocal = (url) => {
      if (!url) return;
      try {
        // รองรับทั้ง absolute URL และชื่อไฟล์
        const filename = url.includes("/uploads/")
          ? url.split("/uploads/")[1]
          : url;
        if (!filename) return;
        const filePath = path.join(process.cwd(), "uploads", filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch { /* เงียบไว้ ไม่ให้ crash */ }
    };

    unlinkIfLocal(doc.imageMainUrl);
    (doc.imageSideUrls || []).forEach(unlinkIfLocal);

    return res.json({ ok: true, deletedId: id });
  } catch (e) {
    console.error("delete product error:", e);
    return res.status(500).json({ message: "delete failed" });
  }
});

export default router;
