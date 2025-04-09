
import { useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CATEGORIES } from "@/data/categories";
import { LAUNDRY_ITEMS, LaundryItem } from "@/data/laundryItems";

const UpdatePriceList = () => {
  const [selectedCategory, setSelectedCategory] = useState("washing-drying");
  const [selectedItem, setSelectedItem] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState<string>("");
  const { toast } = useToast();

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedItem("");
    setCurrentPrice(null);
    setNewPrice("");
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
    const items = LAUNDRY_ITEMS[selectedCategory];
    const item = items.find((i) => i.id === itemId);
    setCurrentPrice(item ? item.price : null);
    setNewPrice("");
  };

  const handleUpdatePrice = () => {
    if (!selectedItem || !newPrice) {
      toast({
        title: "Error",
        description: "Please select an item and enter a new price",
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
      description: `The price has been updated to Rs. ${priceValue}`,
    });
    
    setCurrentPrice(priceValue);
    setNewPrice("");
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-center">UPDATE PRICE LIST</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Category sidebar */}
          <div className="bg-white rounded-lg shadow p-4 lg:col-span-1">
            <h2 className="font-bold text-lg mb-4 text-center">Categories</h2>
            <div className="space-y-2">
              {CATEGORIES.map(category => (
                <Button 
                  key={category.id} 
                  onClick={() => handleCategoryChange(category.id)} 
                  className={`w-full justify-start ${selectedCategory === category.id ? 'bg-laundry-blue' : ''}`}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Items grid */}
          <div className="bg-white rounded-lg shadow p-4 lg:col-span-3">
            <h3 className="font-bold text-md mb-4">Select an item to update its price</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {LAUNDRY_ITEMS[selectedCategory]?.map(item => (
                <div 
                  key={item.id} 
                  className={`border rounded-lg p-4 cursor-pointer ${selectedItem === item.id ? "bg-laundry-blue text-white" : "bg-gray-50"}`}
                  onClick={() => handleItemSelect(item.id)}
                >
                  <div className="text-center">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm">{`Rs. ${item.price}`}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedItem && (
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
      </div>
    </AuthLayout>
  );
};

export default UpdatePriceList;
