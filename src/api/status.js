import { instace as axios } from "./axios";
export const getStatusRequest = (refLectura) =>
  axios.get(`/status/?refLectura=${refLectura}`);
export const getStatusQueryRequest = (refLectura, refUsuario) =>
  axios.get(`/statusquery/?refLectura=${refLectura}&refUsuario=${refUsuario}`);
export const getStatusRespuestasRequest = (refLectura, refUsuario) =>
  axios.get(
    `/statusrespuestasqu/?refLectura=${refLectura}&refUsuario=${refUsuario}`
  );

export const getPartParrafosRequest = (refLectura, refUsuario) =>
  axios.get(
    `/statuspartparrafosqu/?refLectura=${refLectura}&refUsuario=${refUsuario}`
  );

export const getSepNivRequest = (refLectura, refUsuario) =>
  axios.get(
    `/statussepnivpreguntasqu/?refLectura=${refLectura}&refUsuario=${refUsuario}`
  );

export const getYouPreguntasRequest = (refLectura, refUsuario) =>
  axios.get(
    `/statusyoupreguntasqu/?refLectura=${refLectura}&refUsuario=${refUsuario}`
  );

export const getProductoFinalRequest = (refLectura, refUsuario) =>
  axios.get(
    `/statusproductofinalqu/?refLectura=${refLectura}&refUsuario=${refUsuario}`
  );

export const getLectCompRequest = (refLectura, refUsuario) =>
  axios.get(
    `/statuslectcompqu/?refLectura=${refLectura}&refUsuario=${refUsuario}`
  );

export const createStatusRequest = (refLectura, content) =>
  axios.post(`/status/?refLectura=${refLectura}`, content);

export const getStatusAllRequest = () => axios.get("/statusall");
export const getStatusMyAllRequest = () => axios.get("/statusallmylects");

export const updateStatusRequest = (id, content) =>
  axios.put(`/status/${id}`, content);

export const deleteStatusRequest = (id) => axios.delete(`/status/${id}`);
