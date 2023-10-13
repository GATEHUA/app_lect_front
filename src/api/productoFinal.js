import { instace as axios, fileHeader } from "./axios";

export const createProductoFinalRequest = (content, refLectura) =>
  axios.post(`/productoFinal/?refLectura=${refLectura}`, content, fileHeader);
export const getProductoFinalRequest = (refLectura) =>
  axios.get(`/productoFinal/?refLectura=${refLectura}`);
