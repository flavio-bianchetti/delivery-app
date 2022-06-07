// adaptado do request.js utilizado no frontend do projeto Trybe Futebol Clube
// https://github.com/tryber/sd-015-b-trybe-futebol-clube

const axios = require('axios');
// import 'dotenv/config';

const api = axios.create({
  baseURL: `${process.env.API_URL || 'http://localhost'}:${process.env.API_PORT || '3001'}`,
  // baseURL: 'http://localhost:3001',
});

const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

const requestData = async (token, endpoint) => {
  setToken(token);
  const { data } = await api.get(endpoint);
  return data;
};

const updateData = async (token, endpoint, body) => {
  setToken(token);
  const { data } = await api.put(endpoint, body);
  return data;
};

const setData = async (token, endpoint, body) => {
  setToken(token);
  const { data } = await api.post(endpoint, body);
  return data;
};

const deleteData = async (token, endpoint) => {
  setToken(token);
  const { data } = await api.delete(endpoint);
  return data;
};

export default api;

export {
  setToken,
  requestLogin,
  requestData,
  setData,
  updateData,
  deleteData,
};
