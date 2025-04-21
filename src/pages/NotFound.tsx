import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-bold text-tatva-blue mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild className="flex items-center justify-center">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
