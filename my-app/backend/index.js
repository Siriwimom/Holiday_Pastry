import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ เชื่อม route
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
