import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";

  // Debug logging
  useEffect(() => {
    console.log("ProtectedRoute - isAuthenticated from localStorage:", isAuthenticated);
  }, [isAuthenticated]);

  const { data: isAuthValid, isLoading, error } = useQuery({
    queryKey: ["auth-check"],
    queryFn: async () => {
      console.log("Making auth check request to /api/admin/check-auth");
      try {
        const response = await axios.get("/api/admin/check-auth", {
          withCredentials: true
        });
        console.log("Auth check response:", response.data);
        return response.data.authenticated;
      } catch (error) {
        console.error("Auth check failed:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error details:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
          });
        }
        return false;
      }
    },
    enabled: isAuthenticated, // Only run the check if localStorage says we're authenticated
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider the auth check valid for 5 minutes
  });

  // Debug logging
  useEffect(() => {
    console.log("ProtectedRoute - isAuthValid from API:", isAuthValid);
    console.log("ProtectedRoute - isLoading:", isLoading);
    console.log("ProtectedRoute - error:", error);
  }, [isAuthValid, isLoading, error]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Verifying authentication...</p>
      </div>
    </div>;
  }

  if (!isAuthenticated || !isAuthValid) {
    console.log("Authentication failed - redirecting to login");
    // Clear any stale authentication data
    localStorage.removeItem("adminAuthenticated");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  console.log("Authentication successful - rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute; 