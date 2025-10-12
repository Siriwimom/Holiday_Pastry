// api/auth.js
import { api } from "../lib/api";

export async function loginApi({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  // backend ต้องส่ง { token, user: { id, email, role } }
  localStorage.setItem("token", data.token);
  api.defaults.headers.Authorization = `Bearer ${data.token}`;
  return { token: data.token, user: data.user };
}

export async function registerApi({ email, password }) {
  const { data } = await api.post("/auth/register", { email, password });
  localStorage.setItem("token", data.token);
  api.defaults.headers.Authorization = `Bearer ${data.token}`;
  return { token: data.token, user: data.user };
}
