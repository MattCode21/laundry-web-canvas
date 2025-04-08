
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Mock data for delivery requests
const DELIVERY_REQUESTS = [
  { 
    id: "2340", 
    status: "NOT READY", 
  },
  { 
    id: "2200", 
    status: "READY FOR DELIVERY", 
  },
  { 
    id: "1837", 
    status: "ASSIGNED TO DELIVERY PARTNER", 
  },
  { 
    id: "1840", 
    status: "OUT FOR DELIVERY", 
  },
  { 
    id: "1245", 
    status: "DELIVERED", 
  },
];

const DeliveryRequests = () => {
  const [requests, setRequests] = useState(DELIVERY_REQUESTS);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getStatusClass = (status: string) => {
    switch (status) {
      case "READY FOR DELIVERY":
        return "bg-green-100 text-green-800";
      case "ASSIGNED TO DELIVERY PARTNER":
        return "bg-blue-100 text-blue-800";
      case "OUT FOR DELIVERY":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const handleManage = (id: string) => {
    navigate(`/delivery-request/${id}`);
  };

  const handleRemove = (id: string) => {
    setRequests(requests.filter(request => request.id !== id));
    toast({
      title: "Request Removed",
      description: `Delivery request #${id} has been removed`,
    });
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-laundry-blue text-white">
              <th className="p-4 text-left">ORDER NUMBER</th>
              <th className="p-4 text-left">STATUS</th>
              <th className="p-4 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b">
                <td className="p-4 font-semibold">#{request.id}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleManage(request.id)}
                    >
                      MANAGE
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(request.id)}
                    >
                      REMOVE
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthLayout>
  );
};

export default DeliveryRequests;
