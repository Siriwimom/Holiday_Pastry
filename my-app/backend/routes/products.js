import { Router } from "express";
import Product from "../models/Product.js";

const r = Router();

// GET /api/products
r.get("/", async (_req, res) => {
  const items = await Product.find().sort({ createdAt: -1 });
  res.json(items);
});

// POST /api/products (seed แบบง่าย ใช้ตอน dev)
r.post("/seed", async (_req, res) => {
  await Product.deleteMany({});
  const docs = await Product.insertMany([
    { name: "Mayongchid Cheese Pie", price: 690, image: "/images/BS1.jpg", tags: ["best"] },
    { name: "Christmas Cake", price: 2290, image: "/images/CF1.jpg", tags: ["fav"] }
  ]);
  res.json(docs);
});

export default r;
