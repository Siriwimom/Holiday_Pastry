// src/lib/api.js
import axios from "axios";



export const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 แก้ตรงนี้
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
export const setAuthHeaders = ({ token, userId }) => {
  api.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
  if (userId) api.defaults.headers.common["x-user-id"] = userId;
};

export default api;
