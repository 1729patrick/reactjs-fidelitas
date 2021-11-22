import axios from 'axios';
//http://167.71.26.220/fidelitas
//http://localhost:3002/fidelitas
const baseURL = 'http://167.71.26.220/fidelitas';

const api = axios.create({
  baseURL,
});

export default api;
