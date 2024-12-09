import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:' taskifybackend-production.up.railway.app', 
  headers: {
    'Content-Type': 'application/json',
  },
});
export default axiosInstance