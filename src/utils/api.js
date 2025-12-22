import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Auth API calls
export const authAPI = {
  login: (credentials) => axios.post(`${API_URL}/auth/admin/login`, credentials),
  register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
  adminLogin: (credentials) => axios.post(`${API_URL}/auth/admin/login`, credentials)
};

// Registration API calls
// Registration API calls
export const registrationAPI = {
  create: (data) => {
    // Debug FormData contents properly
    console.log('FormData being sent:');
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);  // This will show actual key-value pairs
    }

    return axios.post(`${API_URL}/registration`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getMyRegistration: () => axios.get(`${API_URL}/registration/my-registration`),
  getPricing: () => axios.get(`${API_URL}/registration/pricing`)
};

// Payment API calls
export const paymentAPI = {
  createOrderRegistration: () => axios.post(`${API_URL}/payment/create-order/registration`),
  createOrderAccommodation: (bookingId) => 
    axios.post(`${API_URL}/payment/create-order/accommodation`, { bookingId }),
  verifyPayment: (data) => axios.post(`${API_URL}/payment/verify`, data),
  paymentFailed: (data) => axios.post(`${API_URL}/payment/failed`, data)
};

// Accommodation API calls
export const accommodationAPI = {
  getAll: () => axios.get(`${API_URL}/accommodation`),
  getById: (id) => axios.get(`${API_URL}/accommodation/${id}`),
  book: (data) => axios.post(`${API_URL}/accommodation/book`, data),
  getMyBookings: () => axios.get(`${API_URL}/accommodation/my-bookings`)
};

// Abstract API calls
export const abstractAPI = {
  submit: (formData) => axios.post(`${API_URL}/abstract/submit`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getMyAbstract: () => axios.get(`${API_URL}/abstract/my-abstract`),
  getAll: (params) => axios.get(`${API_URL}/abstract/all`, { params }),
  review: (id, data) => axios.put(`${API_URL}/abstract/review/${id}`, data)
};

// Feedback API calls
export const feedbackAPI = {
  submit: (data) => axios.post(`${API_URL}/feedback/submit`, data),
  getMyFeedback: () => axios.get(`${API_URL}/feedback/my-feedback`),
  getAll: () => axios.get(`${API_URL}/feedback/all`),
  getAnalytics: () => axios.get(`${API_URL}/feedback/analytics`)
};

// Admin API calls
export const adminAPI = {
  getDashboard: () => axios.get(`${API_URL}/admin/dashboard`),
  getRegistrations: (params) => axios.get(`${API_URL}/admin/registrations`, { params }),
  getPayments: (params) => axios.get(`${API_URL}/admin/payments`, { params }),
  createAccommodation: (data) => axios.post(`${API_URL}/admin/accommodations`, data),
  updateAccommodation: (id, data) => axios.put(`${API_URL}/admin/accommodations/${id}`, data),
  deleteAccommodation: (id) => axios.delete(`${API_URL}/admin/accommodations/${id}`),
  getAccommodationBookings: (params) => axios.get(`${API_URL}/admin/accommodation-bookings`, { params })
};