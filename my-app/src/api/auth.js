// src/api/auth.js
import { api } from "../lib/api";

// สมัครสมาชิก

export const registerApi = (data) =>
  api.post("/auth/register", data).then((r) => r.data);

// ล็อกอิน
export async function loginApi({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // { user, token }
}

export const checkEmailApi = (email) =>
  api.post("/auth/check-email", { email }).then(r => r.data);

export const resetPasswordApi = (email, newPassword) =>
  api.post("/auth/reset-password-direct", { email, newPassword }).then(r => r.data);

