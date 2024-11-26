import { getToken } from '@/helpers/storage';
import axios from 'axios';

const token = getToken()
const BASE_URL = import.meta.env.VITE_MANAGMENT_URL

const Axios = axios.create({
  baseURL: BASE_URL, 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json', 
    Authorization: `Bearer ${token}`, 
  },
});

Axios.interceptors.request.use(
  (config) => {
    console.log('Request sent:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.error('Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default Axios;
