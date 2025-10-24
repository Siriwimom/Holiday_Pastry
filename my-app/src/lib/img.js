// src/lib/img.js
export const FILE_BASE =
  import.meta.env.VITE_FILE_BASE || "http://localhost:5000";

export function resolveImg(val) {
  if (!val) return null;                       // ไม่มี ก็ไม่เรนเดอร์รูป
  if (/^https?:\/\//i.test(val)) return val;   // ถ้าเป็น URL เต็มแล้ว ใช้เลย
  // กรณีได้เป็นชื่อไฟล์จาก DB (imageMain เป็นชื่อไฟล์)
  return `${FILE_BASE}/uploads/${val}`;
}

