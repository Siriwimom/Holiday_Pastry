import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // auth base
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, default: "user" },
    passwordHash: { type: String, required: true, select: false },

    // profile fields (ตรงกับ frontend)
    username: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },

    // detail address
    province: { type: String, default: "" },
    street: { type: String, default: "" },

    // bank info
    bankFirst: { type: String, default: "" },
    bankLast: { type: String, default: "" },
    bankNumber: { type: String, default: "" },
    bankType: { type: String, default: "" },

    // images (base64 หรือ URL)
    profileImage: { type: String, default: "" },
    bankImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
