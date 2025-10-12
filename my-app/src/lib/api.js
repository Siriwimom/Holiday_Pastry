// src/lib/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ใส่ token ถ้ามี
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}
