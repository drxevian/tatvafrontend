
// This file is now deprecated and should not be used directly
// MongoDB operations should now go through the server API
// This file is kept for backward compatibility but will issue warnings

export const isClientSide = typeof window !== 'undefined';

// Warning message
const deprecationWarning = () => {
  console.warn("Direct MongoDB access is deprecated. Use the API endpoints instead.");
};

// Placeholder functions that will warn about deprecation
export const getMongoClient = async () => {
  deprecationWarning();
  throw new Error("MongoDB operations must be performed through the API");
};

export const getCollection = async () => {
  deprecationWarning();
  throw new Error("MongoDB operations must be performed through the API");
};

// ObjectId placeholder for backward compatibility
export class ObjectId {
  constructor(id: string) {
    deprecationWarning();
    return { toString: () => id } as any;
  }
}
