// src/api/auth.js
import { api } from "../lib/api";

export async function loginApi({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // { user, token }
}

// (ถ้าใช้สมัครสมาชิก)
export async function registerApi({ name, email, password }) {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
}
