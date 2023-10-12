import { instace as axios } from "./axios";

export const getParrafosRequest = (refLectura) =>
  axios.get(`/parrafos/?refLectura=${refLectura}`);
export const getParrafoRequest = (id) => axios.get(`/parrafo/${id}`);
export const createParrafoRequest = (refLectura, parrafo) =>
  axios.post(`/parrafo/?refLectura=${refLectura}`, parrafo);
export const createParrafosRequest = (contenido, refLectura) =>
  axios.post(`/parrafos/?refLectura=${refLectura}`, contenido);
export const updateParrafoRequest = (id, parrafo) =>
  axios.put(`/parrafo/${id}`, parrafo);
export const deleteParrafoRequest = (id) => axios.delete(`/parrafo/${id}`);
