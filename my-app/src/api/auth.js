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

export const checkEmailApi = (email) =>
  api.post("/auth/check-email", { email }).then(r => r.data);

export const resetPasswordApi = (email, newPassword) =>
  api.post("/auth/reset-password-direct", { email, newPassword }).then(r => r.data);

