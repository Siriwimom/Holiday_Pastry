// src/lib/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export function setAuthHeaders({ token, userId }) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
  if (userId) api.defaults.headers.common["x-user-id"] = userId;
  else delete api.defaults.headers.common["x-user-id"];
}
