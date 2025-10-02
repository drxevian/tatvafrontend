import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;

export const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' 
  ? import.meta.env.VITE_PRODUCTION_API_URL 
  : import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  INQUIRIES: `${API_BASE_URL}/inquiries`,
  CONTACTS: `${API_BASE_URL}/contacts`,
  SERVICE_INQUIRIES: `${API_BASE_URL}/service-inquiries`,
  ADMIN: {
    LOGIN: `${API_BASE_URL}/admin/login`,
    LOGOUT: `${API_BASE_URL}/admin/logout`,
    CHECK_AUTH: `${API_BASE_URL}/admin/check-auth`
  }
}; 
