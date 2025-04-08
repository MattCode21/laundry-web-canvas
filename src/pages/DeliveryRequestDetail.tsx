
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Mock status options
const STATUS_OPTIONS = [
  { value: "ready", label: "READY FOR DELIVERY" },
  { value: "notReady", label: "NOT READY" },
  { value: "assigned", label: "ASSIGNED TO PARTNER" },
  { value: "outForDelivery", label: "OUT FOR DELIVERY" },
  { value: "delivered", label: "DELIVERED" },
];

// Mock partner options
const PARTNER_OPTIONS = [
  { value: "partner1", label: "John Doe" },
  { value: "partner2", label: "Jane Smith" },
  { value: "partner3", label: "Mike Johnson" },
];

// Mock location options
const LOCATION_OPTIONS = [
  { value: "loc1", label: "Main Street" },
  { value: "loc2", label: "Downtown" },
  { value: "loc3", label: "Uptown" },
  { value: "loc4", label: "West End" },
];

// Mock time options
const TIME_OPTIONS = [
  { value: "9am", label: "9 am" },
  { value: "12pm", label: "12 pm" },
  { value: "3pm", label: "3 pm" },
  { value: "6pm", label: "6 pm" },
];

// Mock payment status options
const PAYMENT_OPTIONS = [
  { value: "paid", label: "PAID" },
  { value: "pending", label: "PENDING" },
  { value: "failed", label: "FAILED" },
];

const DeliveryRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [status, setStatus] = useState("ready");
  const [partner, setPartner] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [requestedTime, setRequestedTime] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const handleUpdate = () => {
    // Validate form
    if (!status || (status === "assigned" && !partner) || !location || !phoneNumber || !requestedTime || !paymentStatus) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would update the delivery request in an API
    toast({
      title: "Request Updated",
      description: `Delivery request #${id} has been updated`,
    });
    
    navigate("/delivery-requests");
  };

  const handleAssignDelivery = () => {
    if (!partner) {
      toast({
        title: "Error",
        description: "Please select a delivery partner",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would assign the delivery partner in an API
    toast({
      title: "Partner Assigned",
      description: `Delivery partner has been assigned to order #${id}`,
    });
    
    setStatus("assigned");
  };

  const handleAssignToLocation = () => {
    if (!location) {
      toast({
        title: "Error",
        description: "Please select a delivery location",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would update the delivery location in an API
    toast({
      title: "Location Assigned",
      description: `Delivery location has been updated for order #${id}`,
    });
  };

  return (
    <AuthLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">ORDER #{id}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">STATUS</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="mobileNumber">MOBILE NUMBER</Label>
                <Input
                  id="mobileNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter customer phone number"
                  className="bg-gray-100"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="partner">DELIVERY PARTNER</Label>
                </div>
                <div className="flex space-x-2">
                  <Select value={partner} onValueChange={setPartner} className="flex-1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select partner" />
                    </SelectTrigger>
                    <SelectContent>
                      {PARTNER_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleAssignDelivery}
                    className="whitespace-nowrap bg-laundry-blue hover:bg-laundry-darkBlue"
                  >
                    ASSIGN
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="location">DELIVERY LOCATION</Label>
                </div>
                <div className="flex space-x-2">
                  <Select value={location} onValueChange={setLocation} className="flex-1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleAssignToLocation}
                    className="whitespace-nowrap bg-laundry-blue hover:bg-laundry-darkBlue"
                  >
                    ASSIGN
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="requestedTime">REQUESTED DELIVERY TIME</Label>
                <Select value={requestedTime} onValueChange={setRequestedTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="paymentStatus">PAYMENT STATUS</Label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button 
              className="bg-green-600 hover:bg-green-700 min-w-[150px]"
              onClick={handleUpdate}
            >
              UPDATE
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default DeliveryRequestDetail;
