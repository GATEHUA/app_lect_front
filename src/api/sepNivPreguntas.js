import { instace as axios } from "./axios";
export const createSepNivPreguntaRequest = (content) =>
  axios.post(`/sepNivPregunta`, content);

export const getSepNivPreguntasRequest = (idLectura) =>
  axios.get(`/sepNivPreguntas/?idLectura=${idLectura}`);

export const deleteFilteredSepNivPreguntasRequest = (refLectura, refUsuario) =>
  axios.delete(
    `/sepNivPreguntas/?refLectura=${refLectura}&refUsuario=${refUsuario}`
  );
export const updateSepNivPreguntaRequest = (id, content) =>
  axios.put(`/sepNivPregunta/${id}`, content);
