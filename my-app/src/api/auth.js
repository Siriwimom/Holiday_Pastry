// src/api/auth.js
import { api } from "../lib/api";
// (ถ้าใช้สมัครสมาชิก)
export async function registerApi({ name, email, password }) {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
}

export async function loginApi(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data; // { user, token }
}

// เช็คว่า email มีอยู่ในระบบไหม
export async function checkEmailApi(email) {
  const { data } = await api.post("/auth/check-email", { email });
  // ค่าที่คาดหวัง: { ok:true, exists:boolean }
  return data;
}

// รีเซ็ตรหัสผ่าน
export async function resetPasswordApi(email, newPassword) {
  const { data } = await api.post("/auth/reset-password", { email, newPassword });
  // ค่าที่คาดหวัง: { ok:true, message:"Password reset successful" }
  return data;
}







