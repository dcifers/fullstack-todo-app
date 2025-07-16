import axios from 'axios';
import { User, Todo } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  
  getProfile: () => 
    api.get('/auth/profile'),
};

// Todo API
export const todoAPI = {
  getTodos: () => 
    api.get('/todos'),
  
  createTodo: (title: string, description?: string) =>
    api.post('/todos', { title, description }),
  
  updateTodo: (id: string, updates: { title?: string; description?: string; completed?: boolean }) =>
    api.put(`/todos/${id}`, updates),
  
  deleteTodo: (id: string) =>
    api.delete(`/todos/${id}`),
};

export default api;