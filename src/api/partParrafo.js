import { instace as axios, fileHeader } from "./axios";

export const createPartParrafoRequest = (content, refParrafo) =>
  axios.post(`/partParrafo/?refParrafo=${refParrafo}`, content, fileHeader);
export const getPartParrafoRequest = (refParrafo) =>
  axios.get(`/partParrafo/?refParrafo=${refParrafo}`);
export const updatePartParrafoRequest = (id, content) =>
  axios.put(`/partParrafo/${id}`, content);
export const deletePartParrafoRequest = (id) =>
  axios.delete(`/partParrafo/${id}`);
