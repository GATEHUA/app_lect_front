import { instace as axios } from "./axios";
export const createPreguntasRequest = (contenido, refLectura) =>
  axios.post(`/preguntasyalternativas/?refLectura=${refLectura}`, contenido);
export const createPreguntaRequest = (pregunta, refLectura) =>
  axios.post(`/pregunta/?refLectura=${refLectura}`, pregunta);
export const getPreguntasRequest = (refLectura) =>
  axios.get(`/preguntas/?refLectura=${refLectura}`);
export const getMyPreguntasRequest = (refLectura) =>
  axios.get(`/mypreguntas/?refLectura=${refLectura}`);
export const getMyPreguntasChallengueRequest = (refLectura) =>
  axios.get(`/preguntaschallengue/?refLectura=${refLectura}`);
export const getPreguntaRequest = (id) => axios.get(`/pregunta/${id}`);
export const updatePregunaRequest = (id, pregunta) =>
  axios.put(`/pregunta/${id}`, pregunta);
export const deletePregunaRequest = (id) => axios.delete(`/pregunta/${id}`);
export const getMyPreguntasChallengueUserRequest = (refLectura, refUsuario) =>
  axios.get(
    `/preguntaschallengueuser/?refLectura=${refLectura}&refUsuario=${refUsuario}`
  );
