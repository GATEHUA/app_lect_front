import { instace as axios } from "./axios";
export const createSepNivPreguntaRequest = (content) =>
  axios.post(`/sepNivPregunta`, content);

export const getSepNivPreguntasRequest = (idLectura) =>
  axios.get(`/sepNivPreguntas/?idLectura=${idLectura}`);
