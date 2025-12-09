import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import POSPage from "./pages/POSPage";
import KitchenPage from "./pages/KitchenPage";
import HistoryPage from "./pages/HistoryPage";
import ReportsPage from "./pages/ReportsPage";
import ProductsPage from "./pages/ProductsPage";
import EmployeesPage from "./pages/EmployeesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner 
            theme="dark"
            toastOptions={{
              style: {
                background: 'hsl(0 0% 7%)',
                border: '1px solid hsl(0 0% 18%)',
                color: 'hsl(0 0% 100%)',
              },
            }}
          />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route element={<MainLayout />}>
                <Route path="/pos" element={<POSPage />} />
                <Route path="/kitchen" element={<KitchenPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/employees" element={<EmployeesPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
