// backend/index.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

dotenv.config();
app.use(cors());
app.use(express.json());

// เสิร์ฟไฟล์อัปโหลดกลับให้ frontend
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// เส้นทาง API
app.use("/api/products", productsRouter);
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json()); // ใช้กับ application/json เท่านั้น ไม่ชนกับ multer

// static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
  })
  .catch((err) => {
    console.error("Mongo connect error:", err);
    process.exit(1);
  });
