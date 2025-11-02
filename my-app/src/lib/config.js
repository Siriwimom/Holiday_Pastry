// src/config.js
export const API_BASE =
  import.meta.env.VITE_API_URL || "https://holiday-pastry-backend.onrender.com";

export const absUrl = (p) =>
  !p
    ? ""
    : p.startsWith("http")
    ? p
    : `${API_BASE}${p.startsWith("/") ? "" : "/"}${p}`;
