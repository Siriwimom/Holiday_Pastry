// src/lib/api.js
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://holiday-pastry-backend.onrender.com/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// อ่าน token ได้จากได้ทั้ง 2 คีย์: 'token' หรือ 'auth:token'
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("auth:token"); // ✅ รองรับคีย์ที่หน้า Login เซฟไว้

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // ใส่ userId ด้วยถ้ามี (บาง route ใช้ x-user-id)
    const userRaw =
      localStorage.getItem("auth:user") || localStorage.getItem("user");
    if (userRaw) {
      try {
        const user = JSON.parse(userRaw);
        if (user?._id) config.headers["x-user-id"] = user._id;
      } catch {}
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// เผื่อหน้าอื่นเรียกตั้ง header เอง
export function setAuthHeaders({ token, userId } = {}) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];

  if (userId) api.defaults.headers.common["x-user-id"] = userId;
  else delete api.defaults.headers.common["x-user-id"];
}

export default api;
