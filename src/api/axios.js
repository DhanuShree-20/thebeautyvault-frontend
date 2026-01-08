import axios from 'axios';

const instance = axios.create({
  // Switch between local and live automatically
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://thebeautyvault-backend.onrender.com/api'
});

export default instance;