import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://holiday-pastry-backend.onrender.com/api",
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("hp_auth"); // token จาก localStorage
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});
