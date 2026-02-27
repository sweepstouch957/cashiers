// axios.ts
import axios from "axios";
import Cookies from "js-cookie";

const AUTH_TOKEN_KEY = "auth_token";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const authToken = Cookies.get(AUTH_TOKEN_KEY);

  if (authToken && config.headers) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

export default apiClient;