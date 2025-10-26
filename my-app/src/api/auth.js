// src/api/auth.js
import { api } from "./base";

// สมัครสมาชิก
export async function registerApi({ name, email, password }) {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data; // { ok: true, user: {...} }
}

// ล็อกอิน
export async function loginApi({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // { user, token }
}

// เช็คอีเมลมีอยู่หรือไม่
export async function checkEmailApi(email) {
  const { data } = await api.post("/auth/check-email", { email });
  return data; // { ok:true, exists:boolean, ... }
}

// รีเซ็ตรหัสผ่าน
export async function resetPasswordApi({ email, newPassword }) {
  const { data } = await api.post("/auth/reset-password", { email, newPassword });
  return data; // { ok:true, message:"Password updated successfully" }
}
