import axios from 'axios';

const baseURL = 'http://localhost:3002/fidelitas';

const api = axios.create({
  baseURL,
});

export default api;
