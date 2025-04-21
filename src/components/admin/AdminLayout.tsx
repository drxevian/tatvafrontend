import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { PackageOpen, Mail, Settings, PlusCircle, List, Home, MessageSquare, LogOut, Wrench } from "lucide-react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      variant: "default",
    });
    navigate("/admin/login");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard">
                      <Link to="/admin">
                        <Home className="mr-2" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Products">
                      <Link to="/admin/products">
                        <PackageOpen className="mr-2" />
                        <span>Products</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Add Product">
                      <Link to="/admin/products/new">
                        <PlusCircle className="mr-2" />
                        <span>Add Product</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Inquiries">
                      <Link to="/admin/inquiries">
                        <Mail className="mr-2" />
                        <span>Product Inquiries</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Service Inquiries">
                      <Link to="/admin/service-inquiries">
                        <Wrench className="mr-2" />
                        <span>Service Inquiries</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Contact Submissions">
                      <Link to="/admin/contacts">
                        <MessageSquare className="mr-2" />
                        <span>Contact Messages</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {/* <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                      <Link to="/admin/settings">
                        <Settings className="mr-2" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem> */}
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                      <LogOut className="mr-2" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6">
          {children || <Outlet />}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
