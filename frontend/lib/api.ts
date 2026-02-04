import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // In production (Vercel), use production backend
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://hirevia-assignment-3.onrender.com/api';
  }
  // In development, use env variable or localhost
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';
};

const API_URL = getApiUrl();

console.log('API URL configured:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for CORS with credentials
});

// Request interceptor to add mock auth
api.interceptors.request.use(async (config) => {
  // For mock authentication, we'll use basic auth with stored credentials
  const mockUser = localStorage.getItem('mock_user');
  if (mockUser) {
    const user = JSON.parse(mockUser);
    // Use basic auth for mock authentication
    if (user.username === 'testuser') {
      config.headers.Authorization = `Basic ${btoa('testuser:password123')}`;
    } else if (user.username === 'admin') {
      config.headers.Authorization = `Basic ${btoa('admin:admin123')}`;
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Authentication failed, redirect to mock login
      localStorage.removeItem('mock_token');
      localStorage.removeItem('mock_user');
      window.location.href = '/mock-login';
    }
    return Promise.reject(error);
  }
);

export default api;