import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  date: string;
}

export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  const response = await axios.get(API_ENDPOINTS.CONTACTS);
  return response.data;
};

export const addContactSubmission = async (submission: Omit<ContactSubmission, "id" | "status" | "date">): Promise<ContactSubmission | null> => {
  const newSubmission = {
    ...submission,
    status: "new" as const,
    date: new Date().toISOString()
  };

  try {
    const response = await axios.post(API_ENDPOINTS.CONTACTS, newSubmission);
    return response.data;
  } catch (error) {
    console.error("Error adding contact submission:", error);
    throw new Error("Failed to add contact submission");
  }
};

export const updateContactSubmissionStatus = async (id: string, status: "new" | "read" | "replied"): Promise<ContactSubmission | null> => {
  try {
    const response = await axios.patch(`${API_ENDPOINTS.CONTACTS}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating contact submission status:", error);
    return null;
  }
};

export const deleteContactSubmission = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.CONTACTS}/${id}`);
    return response.data.success;
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    return false;
  }
};
