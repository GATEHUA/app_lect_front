import { instace as axios, fileHeader } from "./axios";

export const getUsuariosRequest = () => axios.get("/usuarios");
export const getUsuariosEstudiantesRequest = () =>
  axios.get("/usuariosEstudiantes");
export const getUsuariosEstudiantesRankRequest = () =>
  axios.get("/usuariosEstudiantesRank");
export const createUsuarioRequest = (usuario) =>
  axios.post("/usuario", usuario, fileHeader);
export const deleteUsuarioRequest = (id) => axios.delete(`/usuario/${id}`);
export const updateUsuarioRequest = (id, user) =>
  axios.put(`/usuario/${id}`, user, fileHeader);
export const updatePointsRequest = (id, points) =>
  axios.put(`/usuarioputpoints/${id}`, points);
export const getUsuarioRequest = (id) => axios.get(`/usuario/${id}`);
export const getPerfilUsuarioRequest = (id) =>
  axios.get(`/perfilusuario/${id}`);

// export const createLecturaRequest = (lectura) =>
//   axios.post("/lectura", lectura, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// export const updateLecturaRequest = (id, lectura) =>
//   axios.put(`/lectura/${id}`, lectura);
// export const deleteLecturaRequest = (id) => axios.delete(`/lectura/${id}`);
// export const getLecturaRequest = (id) => axios.get(`/lectura/${id}`);
