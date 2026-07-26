import axios from "axios";
import { API_BASE_URL } from "../utils/constants.js";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("lh-user");
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch { /* noop */ }
  }
  return config;
});
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("lh-user");
    }
    return Promise.reject(err);
  }
);
export default api;