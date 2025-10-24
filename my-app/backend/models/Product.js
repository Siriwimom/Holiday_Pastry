import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    description: String,
    imageMainUrl: { type: String, default: "" },
    imageSideUrls: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
