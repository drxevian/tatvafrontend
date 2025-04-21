export interface Product {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    isNew: boolean;
    images: string[];
    subproductImages?: Record<string, string>;
  }
  