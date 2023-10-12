import { instace as axios, fileHeader } from "./axios";

export const getLecturasRequest = () => axios.get("/lecturas");
export const getLecturasMainRequest = () => axios.get("/lecturasmain");
export const getMyLecturasRequest = () => axios.get("/myLecturas");
export const createLecturaRequest = (lectura) =>
  axios.post("/lectura", lectura, fileHeader);
export const updateLecturaRequest = (id, lectura) =>
  axios.put(`/lectura/${id}`, lectura, fileHeader);
export const deleteLecturaRequest = (id) => axios.delete(`/lectura/${id}`);
export const getLecturaRequest = (id) => axios.get(`/lectura/${id}`);
export const getLecturaMainRequest = (id) => axios.get(`/lecturamain/${id}`);
