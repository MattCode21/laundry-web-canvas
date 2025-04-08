
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Mock data for laundry status
const LAUNDRY_ORDERS = [
  { 
    id: "2341", 
    status: "READY FOR COLLECTION", 
  },
  { 
    id: "2201", 
    status: "READY FOR COLLECTION", 
  },
  { 
    id: "1838", 
    status: "NOT READY", 
  },
  { 
    id: "1841", 
    status: "COLLECTED", 
  },
  { 
    id: "1246", 
    status: "COLLECTED", 
  },
];

const LaundryStatus = () => {
  const [orders, setOrders] = useState(LAUNDRY_ORDERS);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => {
        if (filter === "ready") return order.status === "READY FOR COLLECTION";
        if (filter === "notReady") return order.status === "NOT READY";
        if (filter === "collected") return order.status === "COLLECTED";
        return true;
      });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "READY FOR COLLECTION":
        return "bg-green-100 text-green-800";
      case "COLLECTED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const handleChangeStatus = (id: string) => {
    // In a real app, this would show a modal or form to change the status
    toast({
      title: "Status Updated",
      description: `Status for order #${id} has been updated`,
    });
    
    // For demo purposes, simply rotate the status
    setOrders(orders.map(order => {
      if (order.id === id) {
        let newStatus;
        if (order.status === "NOT READY") {
          newStatus = "READY FOR COLLECTION";
        } else if (order.status === "READY FOR COLLECTION") {
          newStatus = "COLLECTED";
        } else {
          newStatus = "NOT READY";
        }
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  const handleViewBill = (id: string) => {
    navigate(`/bill/${id}`);
  };

  const handleRemove = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
    toast({
      title: "Order Removed",
      description: `Order #${id} has been removed from the list`,
    });
  };

  return (
    <AuthLayout>
      <div className="space-y-4">
        <div className="flex justify-end">
          <div className="w-40">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="notReady">Not Ready</SelectItem>
                <SelectItem value="collected">Collected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-4 font-semibold">#{order.id}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleChangeStatus(order.id)}
                      >
                        CHANGE STATUS
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewBill(order.id)}
                      >
                        VIEW BILL
                      </Button>
                      {order.status === "COLLECTED" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemove(order.id)}
                        >
                          REMOVE
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LaundryStatus;
