
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-6">
        {/* Profile Card */}
        <div className="bg-laundry-darkBlue rounded-lg p-4 text-white shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <img
                src={user?.avatar || "/profile-placeholder.png"}
                alt="Profile"
                className="w-16 h-16 rounded-lg object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-1">NAME: {user?.name}</h2>
              <p className="text-sm">ADMIN ID: {user?.adminId}</p>
              <p className="text-sm">ROLE: {user?.role}</p>
            </div>
          </div>
        </div>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="h-24 rounded-md bg-laundry-blue hover:bg-laundry-darkBlue flex flex-col justify-center items-center"
            onClick={() => navigate("/update-price-list")}
          >
            <span className="font-bold">UPDATE</span>
            <span className="font-bold">PRICE LIST</span>
          </Button>
          
          <Button
            className="h-24 rounded-md bg-black hover:bg-gray-800 flex flex-col justify-center items-center"
            onClick={() => navigate("/take-order")}
          >
            <span className="font-bold">TAKE</span>
            <span className="font-bold">ORDER</span>
          </Button>
          
          <Button
            className="h-24 rounded-md bg-black hover:bg-gray-800 flex flex-col justify-center items-center"
            onClick={() => navigate("/laundry-status")}
          >
            <span className="font-bold">LAUNDRY</span>
            <span className="font-bold">STATUS</span>
          </Button>
          
          <Button
            className="h-24 rounded-md bg-laundry-blue hover:bg-laundry-darkBlue flex flex-col justify-center items-center"
            onClick={() => navigate("/delivery-requests")}
          >
            <span className="font-bold">DELIVERY AND</span>
            <span className="font-bold">SCHEDULE REQUEST</span>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Dashboard;
