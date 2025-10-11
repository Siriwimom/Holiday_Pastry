import api from "./axios";

export async function registerApi({ email, password, name }) {
  const { data } = await api.post("/auth/register", { email, password, name });
  localStorage.setItem("token", data.token);
  return data.user;
}

export async function loginApi({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return data.user;
}
