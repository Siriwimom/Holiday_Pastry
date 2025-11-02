// src/lib/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL
  || "https://holiday-pastry-backend.onrender.com/api";

// ✅ export แบบ named
export const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // เปิดถ้าใช้ cookie
});

// ✅ export ฟังก์ชันเป็น named ด้วย
export function setAuthHeaders({ token, userId } = {}) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];

  if (userId) api.defaults.headers.common["x-user-id"] = userId;
  else delete api.defaults.headers.common["x-user-id"];
}
