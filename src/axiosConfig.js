import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ai-resuume-optimizer-backend-1.onrender.com', // Update to your Render backend
});

export default api;
