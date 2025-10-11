import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],   // ✅ frontend URL
    credentials: true,                   // ✅ เผื่อส่ง cookie ในอนาคต
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

await connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log("✅ Server running on port", process.env.PORT || 5000);
  console.log("Mongo URI:", process.env.MONGO_URI);
});
