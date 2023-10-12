import { instace as axios, fileHeader } from "./axios";

export const registerRequest = (user) => axios.post(`/auth/register`, user);
export const loginRequest = (user) => axios.post(`/auth/login`, user);
export const verifyTokenRequest = () => axios.get(`/auth/profile`);
export const logoutRequest = () => axios.post("/auth/logout");
export const generateCodeRequest = (correo) =>
  axios.post(`/auth/generateCode/${correo}`);
export const verifyCodeRequest = (correo, content) =>
  axios.post(`/auth/verifyCode/${correo}`, content);

export const recoverPasswordRequest = (correo, user) =>
  axios.post(`/auth/recoverPassword/${correo}`, user);
export const recoverPasswordSendRequest = (user) =>
  axios.post(`/auth/recoverPasswordSend`, user);
