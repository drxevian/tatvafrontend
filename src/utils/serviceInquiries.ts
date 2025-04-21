import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export interface ServiceInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  serviceDetails: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
}

export interface ServiceInquiryFormData {
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  serviceDetails: string;
  message: string;
}

export const submitServiceInquiry = async (data: ServiceInquiryFormData): Promise<ServiceInquiry> => {
  const response = await axios.post(API_ENDPOINTS.SERVICE_INQUIRIES, data);
  return response.data;
};

export const getAllServiceInquiries = async (): Promise<ServiceInquiry[]> => {
  const response = await axios.get(API_ENDPOINTS.SERVICE_INQUIRIES);
  return response.data;
};

export const updateServiceInquiryStatus = async (id: string, status: "read" | "replied"): Promise<ServiceInquiry> => {
  try {
    const response = await axios.patch(`${API_ENDPOINTS.SERVICE_INQUIRIES}/${id}/status`, { status }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating service inquiry status:', error);
    throw new Error('Failed to update inquiry status');
  }
};

export const deleteServiceInquiry = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_ENDPOINTS.SERVICE_INQUIRIES}/${id}`, {
      withCredentials: true
    });
    return true;
  } catch (error) {
    console.error('Error deleting service inquiry:', error);
    throw new Error('Failed to delete inquiry');
  }
}; 