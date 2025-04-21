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
  const response = await fetch(API_ENDPOINTS.SERVICE_INQUIRIES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to submit service inquiry');
  }
  return response.json();
};

export const getAllServiceInquiries = async (): Promise<ServiceInquiry[]> => {
  const response = await fetch(API_ENDPOINTS.SERVICE_INQUIRIES);
  if (!response.ok) {
    throw new Error('Failed to fetch service inquiries');
  }
  return response.json();
};

export const updateServiceInquiryStatus = async (id: string, status: "read" | "replied"): Promise<ServiceInquiry> => {
  const response = await fetch(`${API_ENDPOINTS.SERVICE_INQUIRIES}/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Failed to update inquiry status');
  }
  return response.json();
};

export const deleteServiceInquiry = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_ENDPOINTS.SERVICE_INQUIRIES}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete inquiry');
  }
  return true;
}; 