// src/lib/api.js
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://holiday-pastry-backend.onrender.com/api";

// ประกาศ instance เดียว
const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // ถ้าใช้ cookie ค่อยเปิด
});

// helper แนบ header
function setAuthHeaders({ token, userId } = {}) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];

  if (userId) api.defaults.headers.common["x-user-id"] = userId;
  else delete api.defaults.headers.common["x-user-id"];
}

// ✅ export ให้ครบทั้งสองแบบ
export { api, setAuthHeaders };   // <-- named export (รองรับ: import { api } from "../lib/api")
export default api;               // <-- default export (รองรับ: import api from "../lib/api")
