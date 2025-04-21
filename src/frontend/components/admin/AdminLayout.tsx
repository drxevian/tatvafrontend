import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/src/components/ui/sidebar";
import { PackageOpen, Mail, Settings, PlusCircle, List, Home, MessageSquare } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
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
                        <span>Inquiries</span>
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
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                      <Link to="/admin/settings">
                        <Settings className="mr-2" />
                        <span>Settings</span>
                      </Link>
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
