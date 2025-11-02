// src/lib/img.js
const FILE_BASE =
  import.meta.env.VITE_FILE_BASE || "https://holiday-pastry-backend.onrender.com";

// ✅ ฟังก์ชันแปลงชื่อไฟล์หรือ path เป็น URL เต็ม
export function resolveImg(v) {
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v; // ถ้าเป็น URL เต็มแล้ว
  if (v.startsWith("/uploads")) return `${FILE_BASE}${v}`;
  return `${FILE_BASE}/uploads/${v}`;
}

export { FILE_BASE };
