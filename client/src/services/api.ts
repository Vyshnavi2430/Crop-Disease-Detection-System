import axios from 'axios';

const API = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || '/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('krishi_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: any) => API.post('/auth/register', data),
  login: (data: any) => API.post('/auth/login', data),
  forgotPassword: (data: any) => API.post('/auth/forgot-password', data),
  resetPassword: (data: any) => API.post('/auth/reset-password', data)
};

export const userAPI = {
  getProfile: () => API.get('/user/profile'),
  updateProfile: (data: any) => API.put('/user/profile', data)
};

export const aiAPI = {
  analyzeCrop: (formData: FormData) => API.post('/ai/analyze-crop', formData),
  analyzeCropBase64: (imageBase64: string, language: string) => API.post('/ai/analyze-crop', { imageBase64, language }),
  chat: (message: string, history: any[], language: string) => API.post('/ai/chat', { message, history, language })
};

export const scanAPI = {
  saveReport: (report: any) => API.post('/scan/save', report),
  getHistory: () => API.get('/scan/history'),
  deleteReport: (id: string) => API.delete(`/scan/${id}`)
};

export const weatherAPI = {
  getWeather: (state?: string, district?: string, lat?: number, lng?: number) => API.get('/weather', { params: { state, district, lat, lng } })
};

export const marketAPI = {
  getPrices: (state?: string, district?: string, market?: string, crop?: string) => API.get('/market', { params: { state, district, market, crop } }),
  getLocations: () => API.get('/market/locations')
};

export const schemeAPI = {
  getSchemes: (state?: string, search?: string, category?: string) => API.get('/schemes', { params: { state, search, category } })
};

export const shopAPI = {
  getShops: (state?: string, district?: string, place?: string, category?: string, lat?: number, lng?: number, search?: string) => API.get('/shops', { params: { state, district, place, category, lat, lng, search } })
};

export default API;
