import { instace as axios } from "./axios";

export const createAlternativaRequest = (idPregunta, alternativa) =>
  axios.post(`/alternativa/?idPregunta=${idPregunta}`, alternativa);
export const getAlternativaRequest = (id) => axios.get(`/alternativa/${id}`);
export const getAlternativasRequest = (idPregunta) =>
  axios.get(`/alternativas/?idPregunta=${idPregunta}`);
export const updateAlternativaRequest = (id, alternativa) =>
  axios.put(`/alternativa/${id}`, alternativa);
export const deleteAlternativaRequest = (id, idPregunta) =>
  axios.delete(`/alternativa/${id}/?idPregunta=${idPregunta}`);
