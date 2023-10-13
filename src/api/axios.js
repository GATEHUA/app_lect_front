import axios from "axios";
import { API_URL } from "../config";

export const instace = axios.create({
  // baseURL: "/api",
  baseURL: `${API_URL}/api`,

  withCredentials: true,
  // headers: { "Content-Type": "multipart/form-data" },
});

export const fileHeader = {
  headers: { "Content-Type": "multipart/form-data" },
};
