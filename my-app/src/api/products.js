// src/api/products.js
import { api } from "../lib/api";

// GET /api/products
export async function listProducts() {
  const { data } = await api.get("/products");
  return data;
}

// GET /api/products/:id
export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

// POST /api/products  (multipart/form-data)
export async function createProduct({ name, price, category, description, imageMain, imageSide }) {
  const fd = new FormData();
  fd.append("name", name ?? "");
  fd.append("price", String(price ?? ""));
  fd.append("category", category ?? "BS");
  fd.append("description", description ?? "");

  if (imageMain instanceof File) {
    fd.append("imageMain", imageMain);
  }
  if (Array.isArray(imageSide)) {
    imageSide.forEach((f) => {
      if (f instanceof File) fd.append("imageSide", f);
    });
  }

  const { data } = await api.post("/products", fd /* สำคัญ: ห้ามกำหนด headers 'Content-Type' เอง */);
  return data;
}
