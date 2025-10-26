// backend/index.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import { dirname, join } from "path";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));



// serve uploads (static)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (_req, res) => res.json({ ok: true }));

// ---- CONNECT & START ----
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

async function start() {
  try {
    console.log("⏳ connecting to MongoDB...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000, // รอได้หน่อย
      // tls/ssl Atlas ไม่ต้องใส่ option พิเศษทั่วไปใช้ดี
    });

    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 server on http://localhost:${PORT}`);
    });

    mongoose.connection.on("error", err => {
      console.error("Mongo connection error:", err);
    });
  } catch (err) {
    console.error("❌ MongoDB connect failed:", err.message);
    process.exit(1);
  }
}

start();
