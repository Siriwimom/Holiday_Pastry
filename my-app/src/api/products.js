// src/api/products.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// GET all
export async function listProducts() {
  const { data } = await api.get("/products");
  return data;
}

// GET one
export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

// POST create (ใช้ FormData ถ้ามีไฟล์)
export async function createProduct(payload) {
  const fd = new FormData();
  fd.append("name", payload.name || "");
  fd.append("price", payload.price ?? "");
  fd.append("category", payload.category || "BS");
  fd.append("description", payload.description || "");

  if (payload.imageMain) fd.append("imageMain", payload.imageMain);
  if (Array.isArray(payload.imageSide)) {
    payload.imageSide.forEach((f) => fd.append("imageSide", f));
  }
  const { data } = await api.post("/products", fd);
  return data;
}

// DELETE
export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}
