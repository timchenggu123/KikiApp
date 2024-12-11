import axios from 'axios';
axios.defaults.withCredentials = true;
const backend = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    withCredentials: true, // Automatically include cookies
  });
  
export default backend;