import { instace as axios } from "./axios";
export const createRespuestaRequest = (refPregunta, content) =>
  axios.post(`/respuesta/?refPregunta=${refPregunta}`, content);
export const getRespuestaRequest = (refPregunta) =>
  axios.get(`/respuesta/?refPregunta=${refPregunta}`);
export const getRespuestasRequest = (idLectura) =>
  axios.get(`/respuestas/?idLectura=${idLectura}`);

export const getRespuestasChallengueRequest = (refPregunta, refUsuario) =>
  axios.get(
    `/respuestaschallengue/?idLectura=${refPregunta}&refUsuario=${refUsuario}`
  );

export const updateRespuestaRequest = (id, content) =>
  axios.put(`/respuesta/${id}`, content);
export const deleteRespuestaRequest = (id) => axios.delete(`/respuesta/${id}`);
