// backend/models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, enum: ["BS", "CF", "LO"], required: true },
    description: { type: String, default: "" },
    imageMain: { type: String, default: "" },   // '/uploads/xxx.png'
    imageSide: { type: [String], default: [] }, // ['/uploads/a.png', '/uploads/b.png']
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
