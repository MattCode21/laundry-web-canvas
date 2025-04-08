
import { useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const items = [
  { id: "tshirt", name: "T-Shirt", price: 30 },
  { id: "shirt", name: "Shirt", price: 40 },
  { id: "pant", name: "Pant", price: 50 },
  { id: "jeans", name: "Jeans", price: 60 },
  { id: "jacket", name: "Jacket", price: 80 },
  { id: "blanket", name: "Blanket", price: 100 },
];

const services = [
  { id: "steam", name: "STEAM PRESS" },
  { id: "dry", name: "DRY CLEAN" },
  { id: "wash", name: "WASH & IRON" },
];

const UpdatePriceList = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState<string>("");
  const { toast } = useToast();

  const handleItemChange = (value: string) => {
    setSelectedItem(value);
    const item = items.find((i) => i.id === value);
    setCurrentPrice(item ? item.price : null);
    setNewPrice("");
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };

  const handleShowPrice = () => {
    if (!selectedItem || !selectedService) {
      toast({
        title: "Error",
        description: "Please select both item and service",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would fetch the current price from an API
    const item = items.find((i) => i.id === selectedItem);
    setCurrentPrice(item ? item.price : null);
  };

  const handleUpdatePrice = () => {
    if (!selectedItem || !selectedService || !newPrice) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    
    const priceValue = parseFloat(newPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would update the price in an API
    toast({
      title: "Price Updated",
      description: `The price for ${items.find((i) => i.id === selectedItem)?.name} has been updated to Rs. ${priceValue}`,
    });
    
    setCurrentPrice(priceValue);
    setNewPrice("");
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center">CHOOSE SERVICE</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="service">Service Type</Label>
            <Select value={selectedService} onValueChange={handleServiceChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="item">Item Name</Label>
            <Select value={selectedItem} onValueChange={handleItemChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select item" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            className="w-full bg-laundry-blue hover:bg-laundry-darkBlue"
            onClick={handleShowPrice}
          >
            SHOW OLD PRICE
          </Button>
          
          {currentPrice !== null && (
            <div className="border-t pt-4 mt-4">
              <div className="mb-4">
                <Label>CURRENT PRICE:</Label>
                <div className="font-bold">Rs. {currentPrice}/piece</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPrice">NEW PRICE:</Label>
                <Input
                  id="newPrice"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Enter new price"
                  className="bg-gray-100"
                />
              </div>
              
              <Button 
                className="w-full mt-4 bg-laundry-blue hover:bg-laundry-darkBlue"
                onClick={handleUpdatePrice}
              >
                UPDATE PRICE
              </Button>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default UpdatePriceList;
