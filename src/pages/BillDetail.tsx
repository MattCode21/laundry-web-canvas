
import { useParams } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Mock bill items data
const BILL_ITEMS = [
  { id: 1, name: "T-SHIRT WASH & DRY", quantity: 3, price: 15.00, total: 45.00 },
  { id: 2, name: "JEANS WASH & DRY", quantity: 2, price: 25.00, total: 50.00 },
  { id: 3, name: "PANT WASH & DRY", quantity: 2, price: 20.00, total: 40.00 },
  { id: 4, name: "SHIRT STEAM PRESS", quantity: 3, price: 10.00, total: 30.00 },
  { id: 5, name: "JACKET DRY CLEANING", quantity: 1, price: 45.00, total: 45.00 },
  { id: 6, name: "SINGLE BLANKET CLEANING", quantity: 2, price: 30.00, total: 60.00 },
  { id: 7, name: "SMALL CUSHION CLEANING", quantity: 1, price: 25.00, total: 25.00 },
  { id: 8, name: "JACKET DRY CLEANING", quantity: 1, price: 35.00, total: 35.00 },
];

const BillDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description: "Bill has been sent to the printer",
    });
    window.print();
  };

  // Calculate total
  const subtotal = BILL_ITEMS.reduce((acc, item) => acc + item.total, 0);
  const total = subtotal.toFixed(2);

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-laundry-blue">BILL NO #{id}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-laundry-blue text-white text-left">
                <th className="p-3">ITEM</th>
                <th className="p-3 text-center">QUANTITY</th>
                <th className="p-3 text-right">RATE</th>
                <th className="p-3 text-right">PRICE</th>
              </tr>
            </thead>
            <tbody>
              {BILL_ITEMS.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">{item.price.toFixed(2)}</td>
                  <td className="p-3 text-right">{item.total.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td colSpan={3} className="p-3 text-right">TOTAL:</td>
                <td className="p-3 text-right">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            className="bg-laundry-blue hover:bg-laundry-darkBlue min-w-[150px]"
            onClick={handlePrint}
          >
            PRINT BILL
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default BillDetail;
