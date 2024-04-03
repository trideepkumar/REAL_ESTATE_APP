import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://scrapy-v5.onrender.com/api/',

  //timeout implementation
  
  headers: {
    'Content-Type': 'application/json',
     withCredentials: true,
  },
});

export default axiosInstance;