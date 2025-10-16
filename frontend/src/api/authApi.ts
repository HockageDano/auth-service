import axios from "axios";

// якщо бекенд у тому ж контейнері (reverse-proxy / Nginx)
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000"; // 👈 твій бекенд порт

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
