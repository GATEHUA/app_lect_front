import { instace as axios } from "./axios";
export const createRespuestaRequest = (refPregunta, content) =>
  axios.post(`/respuesta/?refPregunta=${refPregunta}`, content);
export const getRespuestaRequest = (refPregunta) =>
  axios.get(`/respuesta/?refPregunta=${refPregunta}`);
export const getRespuestasRequest = (refPregunta) =>
  axios.get(`/respuestas/?idLectura=${refPregunta}`);

export const getRespuestasChallengueRequest = (refPregunta, refUsuario) =>
  axios.get(
    `/respuestaschallengue/?idLectura=${refPregunta}&refUsuario=${refUsuario}`
  );
