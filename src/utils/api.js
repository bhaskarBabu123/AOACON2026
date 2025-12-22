// src/utils/api.js
import axios from 'axios';

const API_URL = 'https://aoa-backend.onrender.com/api';

// Create a single axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage, or your auth context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional - for handling common errors like 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - e.g., redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // or use navigate in component
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  adminLogin: (credentials) => api.post('/auth/admin/login', credentials),
};

// Registration API calls
export const registrationAPI = {
  create: (data) => {
    // Debug FormData contents
    console.log('FormData being sent:');
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
    return api.post('/registration', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getMyRegistration: () => api.get('/registration/my-registration'),
  getPricing: () => api.get('/registration/pricing'),
};

// Payment API calls
export const paymentAPI = {
  createOrderRegistration: () => api.post('/payment/create-order/registration'),
  createOrderAccommodation: (bookingId) =>
    api.post('/payment/create-order/accommodation', { bookingId }),
  verifyPayment: (data) => api.post('/payment/verify', data),
  paymentFailed: (data) => api.post('/payment/failed', data),
};

// Accommodation API calls
export const accommodationAPI = {
  getAll: () => api.get('/accommodation'),
  getById: (id) => api.get(`/accommodation/${id}`),
  book: (data) => api.post('/accommodation/book', data),
  getMyBookings: () => api.get('/accommodation/my-bookings'),
};

// Abstract API calls
export const abstractAPI = {
  submit: (formData) => api.post('/abstract/submit', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getMyAbstract: () => api.get('/abstract/my-abstract'),
  getAll: (params) => api.get('/abstract/all', { params }),
  review: (id, data) => api.put(`/abstract/review/${id}`, data),
};

// Feedback API calls
export const feedbackAPI = {
  submit: (data) => api.post('/feedback/submit', data),
  getMyFeedback: () => api.get('/feedback/my-feedback'),
  getAll: () => api.get('/feedback/all'),
  getAnalytics: () => api.get('/feedback/analytics'),
};

// Admin API calls
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getRegistrations: (params) => api.get('/admin/registrations', { params }),
  getPayments: (params) => api.get('/admin/payments', { params }),
  createAccommodation: (data) => api.post('/admin/accommodations', data),
  updateAccommodation: (id, data) => api.put(`/admin/accommodations/${id}`, data),
  deleteAccommodation: (id) => api.delete(`/admin/accommodations/${id}`),
  getAccommodationBookings: (params) => api.get('/admin/accommodation-bookings', { params }),
};

// Export the axios instance if needed elsewhere
export default api;