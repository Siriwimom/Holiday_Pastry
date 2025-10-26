// backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, default: "user" },
    // select:false เพื่อไม่ดึงติดมาทุกครั้ง (ต้อง .select("+passwordHash") ตอน login)
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
