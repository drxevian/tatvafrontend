import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Mail, MessageSquare, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalContacts, setTotalContacts] = useState(null);
  const [totalInquiries, setTotalInquiries] = useState(null);
  const [totalServiceInquiries, setTotalServiceInquiries] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, inquiriesRes, contactsRes, serviceInquiriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/inquiries"),
          fetch("/api/contacts"),
          fetch("/api/service-inquiries"),
        ]);

        if (!productsRes.ok || !inquiriesRes.ok || !contactsRes.ok || !serviceInquiriesRes.ok) {
          throw new Error("One or more API requests failed");
        }

        const products = await productsRes.json();
        const inquiries = await inquiriesRes.json();
        const contacts = await contactsRes.json();
        const serviceInquiries = await serviceInquiriesRes.json();

        setTotalProducts(products.length);
        setTotalInquiries(inquiries.length);
        setTotalContacts(contacts.length);
        setTotalServiceInquiries(serviceInquiries.length);

        toast({
          title: "Dashboard Loaded",
          description: "Fetched data successfully from backend.",
          variant: "default",
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load data from server.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return <div className="py-10 text-center">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Products Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalProducts === 0 ? "No data in database" : totalProducts}
            </div>
            <p className="text-xs text-muted-foreground">
              <Link to="/admin/products" className="text-blue-600 hover:underline">
                Manage products
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Inquiries Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Inquiries</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalInquiries === 0 ? "No data in database" : totalInquiries}
            </div>
            <p className="text-xs text-muted-foreground">
              <Link to="/admin/inquiries" className="text-blue-600 hover:underline">
                View all inquiries
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Service Inquiries Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Inquiries</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalServiceInquiries === 0 ? "No data in database" : totalServiceInquiries}
            </div>
            <p className="text-xs text-muted-foreground">
              <Link to="/admin/service-inquiries" className="text-blue-600 hover:underline">
                View service inquiries
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Contacts Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalContacts === 0 ? "No data in database" : totalContacts}
            </div>
            <p className="text-xs text-muted-foreground">
              <Link to="/admin/contacts" className="text-blue-600 hover:underline">
                View all messages
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
