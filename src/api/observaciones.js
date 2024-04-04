import { instace as axios } from "./axios";

export const createObservacionRequest = (refStatus, observacion) =>
  axios.post(`/observacion/?refStatus=${refStatus}`, observacion);
export const getObservacionRequest = (id) => axios.get(`/observacion/${id}`);
export const getObservacionesRequest = (refStatus) =>
  axios.get(`/observaciones/?refStatus=${refStatus}`);
export const updateObservacionRequest = (id, observacion) =>
  axios.put(`/observacion/${id}`, observacion);
export const deleteObservacionRequest = (id, refStatus) =>
  axios.delete(`/observacion/${id}/?refStatus=${refStatus}`);
