export const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' 
  ? import.meta.env.VITE_PRODUCTION_API_URL 
  : import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  INQUIRIES: `${API_BASE_URL}/inquiries`,
  CONTACTS: `${API_BASE_URL}/contacts`,
  SERVICE_INQUIRIES: `${API_BASE_URL}/service-inquiries`,
}; 