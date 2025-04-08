import { useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shirt, Tshirt } from "lucide-react";

// Types for laundry items
type LaundryItem = {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  quantity: number;
};

// Laundry item categories
const CATEGORIES = [
  { id: "washing-dry-cleaning", name: "Washing and Dry Cleaning", icon: "🧼" },
  { id: "household", name: "Household", icon: "🏠" },
  { id: "shoes", name: "Shoes", icon: "👞" },
  { id: "others", name: "Others", icon: "📦" },
];

// Mock data for laundry items by category
const LAUNDRY_ITEMS: Record<string, LaundryItem[]> = {
  "washing-dry-cleaning": [
    { id: "tshirt", name: "T-SHIRT", price: 15, selected: false, quantity: 0 },
    { id: "shirt", name: "SHIRT", price: 20, selected: false, quantity: 0 },
    { id: "pant", name: "PANT", price: 25, selected: false, quantity: 0 },
    { id: "jeans1", name: "JEANS", price: 30, selected: false, quantity: 0 },
    { id: "jacket", name: "JACKET", price: 40, selected: false, quantity: 0 },
    { id: "sweatshirt", name: "SWEATSHIRT", price: 35, selected: false, quantity: 0 },
    { id: "jeans2", name: "JEANS", price: 30, selected: false, quantity: 0 },
    { id: "shorts", name: "SHORTS", price: 20, selected: false, quantity: 0 },
    { id: "blankets", name: "BLANKETS", price: 50, selected: false, quantity: 0 },
  ],
  household: [
    { id: "bedsheet", name: "BEDSHEET", price: 40, selected: false, quantity: 0 },
    { id: "curtains", name: "CURTAINS", price: 60, selected: false, quantity: 0 },
    { id: "towels", name: "TOWELS", price: 25, selected: false, quantity: 0 },
  ],
  shoes: [
    { id: "sneakers", name: "SNEAKERS", price: 70, selected: false, quantity: 0 },
    { id: "formal", name: "FORMAL SHOES", price: 80, selected: false, quantity: 0 },
  ],
  others: [
    { id: "bag", name: "BAG", price: 90, selected: false, quantity: 0 },
    { id: "cap", name: "CAP", price: 15, selected: false, quantity: 0 },
  ],
};

const TakeOrder = () => {
  const [selectedCategory, setSelectedCategory] = useState("washing-dry-cleaning");
  const [items, setItems] = useState<Record<string, LaundryItem[]>>(LAUNDRY_ITEMS);
  const { toast } = useToast();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const toggleItemSelection = (itemId: string) => {
    setItems((prevItems) => {
      const newItems = { ...prevItems };
      const category = newItems[selectedCategory];
      const itemIndex = category.findIndex((item) => item.id === itemId);
      
      if (itemIndex !== -1) {
        const item = category[itemIndex];
        const newItem = {
          ...item,
          selected: !item.selected,
          quantity: item.selected ? 0 : 1,
        };
        category[itemIndex] = newItem;
      }
      
      return newItems;
    });
  };

  const updateQuantity = (itemId: string, amount: number) => {
    setItems((prevItems) => {
      const newItems = { ...prevItems };
      const category = newItems[selectedCategory];
      const itemIndex = category.findIndex((item) => item.id === itemId);
      
      if (itemIndex !== -1) {
        const item = category[itemIndex];
        if (item.selected) {
          const newQuantity = Math.max(0, item.quantity + amount);
          const newItem = {
            ...item,
            quantity: newQuantity,
            selected: newQuantity > 0,
          };
          category[itemIndex] = newItem;
        }
      }
      
      return newItems;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    Object.values(items).forEach((categoryItems) => {
      categoryItems.forEach((item) => {
        if (item.selected && item.quantity > 0) {
          total += item.price * item.quantity;
        }
      });
    });
    return total;
  };

  const handleCreateOrder = () => {
    const selectedItems = Object.values(items)
      .flatMap((categoryItems) => 
        categoryItems.filter((item) => item.selected && item.quantity > 0)
      );
    
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to create an order",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would submit the order to an API
    toast({
      title: "Order created",
      description: `Order created successfully with ${selectedItems.length} items`,
    });
    
    // Reset the form
    setItems(LAUNDRY_ITEMS);
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Category sidebar */}
        <div className="bg-white rounded-lg shadow p-4 lg:col-span-1">
          <h2 className="font-bold text-lg mb-4 text-center">Categories</h2>
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                className={`w-full justify-start ${
                  selectedCategory === category.id
                    ? "bg-laundry-blue hover:bg-laundry-darkBlue"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Items grid */}
        <div className="bg-white rounded-lg shadow p-4 lg:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items[selectedCategory].map((item) => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer ${
                  item.selected ? "bg-laundry-blue text-white" : "bg-gray-50"
                }`}
              >
                <div className="text-center mb-2" onClick={() => toggleItemSelection(item.id)}>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm">{`Rs. ${item.price}`}</p>
                </div>
                
                {item.selected && (
                  <div className="flex justify-center items-center space-x-2 mt-2">
                    <Button 
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 rounded-full bg-white text-laundry-blue font-bold"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </Button>
                    <span className="font-bold">{item.quantity}</span>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 rounded-full bg-white text-laundry-blue font-bold"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex flex-col items-center">
            <div className="text-xl font-bold mb-4">
              Total: Rs. {calculateTotal()}
            </div>
            <Button 
              className="w-full sm:w-auto bg-laundry-blue hover:bg-laundry-darkBlue"
              onClick={handleCreateOrder}
            >
              Create Order
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default TakeOrder;
