import api from "@/config/axios";
import { endpoints } from "@/config/endpoint";
import handleRequest from "./requestHandler";

export const userLogin = (email: string, password: string) => {
  return handleRequest(api.post(endpoints.login, { email, password }));
};

export const register = (name: string, email: string, password: string) => {
  return handleRequest(
    api.post(endpoints.register, { name, email, password })
  );
};

export const refreshTokenApi = (refreshToken: string) => {
  return handleRequest(api.post(endpoints.refreshToken, { refreshToken }));
};