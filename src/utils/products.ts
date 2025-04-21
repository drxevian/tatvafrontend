import { Product } from "@/types";
import { API_ENDPOINTS } from '../config/api';

export type { Product };

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(API_ENDPOINTS.PRODUCTS);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export const addProduct = async (product: Partial<Product>) => {
  const res = await fetch(API_ENDPOINTS.PRODUCTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const url = `${API_ENDPOINTS.PRODUCTS}/${id}`;
  console.log("🌐 PUT request to:", url, "with data:", product);
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  console.log("📥 PUT response status:", res.status);

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return true;
};
