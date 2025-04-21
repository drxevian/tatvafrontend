import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export interface ProductInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  productId: string;
  subproductName?: string;
  status: "new" | "read" | "replied";
  date: string;
}

export const getAllInquiries = async (): Promise<ProductInquiry[]> => {
  const response = await axios.get(API_ENDPOINTS.INQUIRIES);
  return response.data;
};

export const addInquiry = async (inquiry: Omit<ProductInquiry, "id" | "status" | "date">): Promise<ProductInquiry> => {
  const newInquiry = {
    ...inquiry,
    status: "new" as const,
    date: new Date().toISOString()
  };

  const response = await axios.post(API_ENDPOINTS.INQUIRIES, newInquiry);
  return response.data;
};

export const updateInquiryStatus = async (id: string, status: "new" | "read" | "replied"): Promise<ProductInquiry | null> => {
  try {
    const response = await axios.patch(`${API_ENDPOINTS.INQUIRIES}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    return null;
  }
};

export const deleteInquiry = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.INQUIRIES}/${id}`);
    return response.data.success;
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return false;
  }
};
