// backend/models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ["BS", "CF", "LO"], required: true },
  imageUrl: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
