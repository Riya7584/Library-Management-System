import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;