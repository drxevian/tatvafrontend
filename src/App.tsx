// src/App.tsx
import { Toaster } from "src/components/ui/toaster.tsx";
import { Toaster as Sonner } from "src/components/ui/sonner";
import { TooltipProvider } from "src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import PageLayout from "src/components/PageLayout";
import HomePage from "src/pages/HomePage";
import ServicesPage from "src/pages/ServicesPage";
import ProductsPage from "src/pages/ProductsPage";
import ProductCategory from "src/components/ProductCategory";
import AboutPage from "src/pages/AboutPage";
import ContactPage from "src/pages/ContactPage";
import NotFound from "src/pages/NotFound";
import ProjectPlanningPage from "src/pages/services/ProjectPlanningPage";
import TradingPage from "src/pages/services/TradingPage";
import InstallationPage from "src/pages/services/InstallationPage";
import MaintenancePage from "src/pages/services/MaintenancePage";
import LogisticsPage from "src/pages/services/LogisticsPage";

// Admin imports
import AdminLayout from "src/components/admin/AdminLayout";
import AdminDashboard from "src/pages/admin/AdminDashboard";
import ProductsManagementPage from "src/pages/admin/ProductsManagementPage";
import AddProductPage from "src/pages/admin/AddProductPage";
import EditProductPage from "src/pages/admin/EditProductPage";
import InquiriesPage from "src/pages/admin/InquiriesPage";
import ServiceInquiriesPage from "src/pages/admin/ServiceInquiriesPage";
import ContactSubmissionsPage from "src/pages/admin/ContactSubmissionsPage";
import AdminLoginPage from "src/pages/admin/AdminLoginPage";
import ProtectedRoute from "src/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PageLayout><Outlet /></PageLayout>}>
            <Route index element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/project-planning" element={<ProjectPlanningPage />} />
            <Route path="/services/trading" element={<TradingPage />} />
            <Route path="/services/installation" element={<InstallationPage />} />
            <Route path="/services/maintenance" element={<MaintenancePage />} />
            <Route path="/services/logistics" element={<LogisticsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:categoryId" element={<ProductCategory />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route path="login" element={<AdminLoginPage />} />
            <Route index element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="products" element={
              <ProtectedRoute>
                <ProductsManagementPage />
              </ProtectedRoute>
            } />
            <Route path="products/new" element={
              <ProtectedRoute>
                <AddProductPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/products/edit/:productId" element={
              <ProtectedRoute>
                <EditProductPage />
              </ProtectedRoute>
            } />
            <Route path="inquiries" element={
              <ProtectedRoute>
                <InquiriesPage />
              </ProtectedRoute>
            } />
            <Route path="service-inquiries" element={
              <ProtectedRoute>
                <ServiceInquiriesPage />
              </ProtectedRoute>
            } />
            <Route path="contacts" element={
              <ProtectedRoute>
                <ContactSubmissionsPage />
              </ProtectedRoute>
            } />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
