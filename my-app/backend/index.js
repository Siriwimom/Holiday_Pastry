// ===== index.js =====
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// ✅ Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import purchasesRoutes from "./routes/purchases.js";

dotenv.config();

// ====== Path setup ======
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ====== ✅ CORS (ให้ frontend localhost เข้าถึงได้) ======
const allowedOrigins = [
  "http://localhost:5173", // frontend dev (Vite)
  "http://localhost:3000", // frontend dev (CRA)
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("CORS not allowed: " + origin));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-user-id"],
  })
);

app.options("*", cors());

// ====== Middleware ======
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ====== Static Uploads (ใช้สำหรับรูปภาพ) ======
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ====== Routes ======
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/purchases", purchasesRoutes);

// ====== Default route ======
app.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "🍰 Holiday Pastry Backend running on localhost:5000",
  });
});

// ====== 404 handler ======
app.use((req, res) => {
  res.status(404).json({ ok: false, message: "Not Found" });
});

// ====== Error handler ======
app.use((err, _req, res, _next) => {
  console.error("💥 Server Error:", err.message);
  res.status(500).json({
    ok: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ====== Database connect & start ======
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/holiday";

async function start() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

start();
