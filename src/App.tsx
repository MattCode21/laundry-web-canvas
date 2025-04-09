
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TakeOrder from "./pages/TakeOrder";
import UpdatePriceList from "./pages/UpdatePriceList";
import DeliveryRequests from "./pages/DeliveryRequests";
import DeliveryRequestDetail from "./pages/DeliveryRequestDetail";
import LaundryStatus from "./pages/LaundryStatus";
import BillDetail from "./pages/BillDetail";
import NotFound from "./pages/NotFound";

// Context
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/take-order" element={<TakeOrder />} />
            <Route path="/update-price-list" element={<UpdatePriceList />} />
            <Route path="/delivery-requests" element={<DeliveryRequests />} />
            <Route path="/delivery-request/:id" element={<DeliveryRequestDetail />} />
            <Route path="/laundry-status" element={<LaundryStatus />} />
            <Route path="/bill/:id" element={<BillDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
