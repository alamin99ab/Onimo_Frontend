import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Authentication
export const loginWithEmail = (credentials) => api.post('/auth/login/email', credentials);
export const registerWithEmail = (userData) => api.post('/auth/register/email', userData);
export const verifyEmail = (data) => api.post('/auth/verify/email', data);

// Chat
export const getConversations = () => api.get('/chat/conversations');
export const getHistory = (id) => api.get(`/chat/history/${id}`);
export const sendMessage = (data) => api.post('/chat/ask', data);
export const deleteConversation = (id) => api.delete(`/chat/conversations/${id}`);

export default api;