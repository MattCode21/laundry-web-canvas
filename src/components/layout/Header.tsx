
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const getTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "HOME";
      case "/take-order":
        return "TAKE ORDER";
      case "/update-price-list":
        return "UPDATE PRICE LIST";
      case "/delivery-requests":
        return "DELIVERY AND SCHEDULE REQUEST";
      case "/laundry-status":
        return "LAUNDRY STATUS";
      default:
        if (pathname.startsWith("/delivery-request/")) {
          return "DELIVERY AND SCHEDULE REQUEST";
        } else if (pathname.startsWith("/bill/")) {
          const billId = pathname.split("/").pop();
          return `BILL NO #${billId}`;
        }
        return "";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <header className="bg-white w-full">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          {pathname !== "/dashboard" && (
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-laundry-blue">
                <Home size={24} />
              </Button>
            </Link>
          )}
          <h1 className="text-laundry-blue font-bold text-xl">{getTitle()}</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="text-laundry-blue" size={20} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
