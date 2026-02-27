// services/authService.ts

import apiClient from "@/lib/axios";
import Cookies from "js-cookie";
export const login = async (email: string, password: string) => {
  const res = await apiClient.post("/auth/login", { email, password });
  const token = res.data.token;
  Cookies.set("auth_token", token);
  return res.data;
};
export const loginWithAccessCode = async (accessCode: string) => {
  const res = await apiClient.post("/auth/login", { accessCode });
  const token = res.data.token;
  Cookies.set("auth_token", token);
  localStorage.setItem("auth_token", token);
  return res.data;
};
export const getMe = async () => {
  const res = await apiClient.get("/auth/me");
  return res.data;
};

export const logout = () => {
  Cookies.remove("auth_token");
  localStorage.removeItem("auth_token");
};
