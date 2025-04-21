import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    console.log("AdminLoginPage - Already authenticated:", isAuthenticated);
    
    if (isAuthenticated) {
      console.log("Already authenticated, checking with backend...");
      // Verify with backend
      axios.get(API_ENDPOINTS.ADMIN.CHECK_AUTH, { withCredentials: true })
        .then(response => {
          console.log("Auth check response:", response.data);
          if (response.data.authenticated && response.data.success) {
            console.log("Backend confirms authentication, redirecting to dashboard");
            navigate("/admin");
          } else {
            console.log("Backend says not authenticated, clearing localStorage");
            localStorage.removeItem("adminAuthenticated");
          }
        })
        .catch(error => {
          console.error("Auth check error:", error);
          localStorage.removeItem("adminAuthenticated");
        });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Attempting login with:", { email, password });

    try {
      // Make actual API call to backend for authentication
      console.log("Making login request to", API_ENDPOINTS.ADMIN.LOGIN);
      const response = await axios.post(API_ENDPOINTS.ADMIN.LOGIN, { email, password }, {
        withCredentials: true // Important: This allows cookies to be set
      });
      
      console.log("Login response:", response.data);
      
      if (response.data.success && response.data.authenticated) {
        // Store authentication state
        localStorage.setItem("adminAuthenticated", "true");
        console.log("Login successful, setting localStorage and redirecting");
        
        toast({
          title: "Login Successful",
          description: response.data.message || "Welcome back, Admin!",
          variant: "default",
        });
        
        navigate("/admin");
      } else {
        console.log("Login failed:", response.data.message);
        throw new Error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
        
        toast({
          title: "Login Failed",
          description: error.response?.data?.message || "Invalid email or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage; 
