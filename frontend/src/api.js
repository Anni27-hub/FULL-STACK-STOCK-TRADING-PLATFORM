import axios from "axios";

const API = axios.create({
  baseURL: "https://zerodha-backend-t2bv.onrender.com"
});

// ✅ attach token BEFORE export
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;