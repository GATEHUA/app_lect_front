import { instace as axios, fileHeader } from "./axios";

export const createPartParrafoRequest = (content, refParrafo) =>
  axios.post(`/partParrafo/?refParrafo=${refParrafo}`, content, fileHeader);
export const getPartParrafoRequest = (refParrafo) =>
  axios.get(`/partParrafo/?refParrafo=${refParrafo}`);
