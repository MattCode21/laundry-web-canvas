import { useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Toggle } from "@/components/ui/toggle";

const DeliveryRequestDetail = () => {
  const [status, setStatus] = useState("pending");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const { toast } = useToast();

  const handleUpdateStatus = () => {
    toast({
      title: "Status Updated",
      description: `Order status updated to ${status}`,
    });
  };

  const handleUpdatePayment = () => {
    toast({
      title: "Payment Status Updated",
      description: `Payment status updated to ${paymentStatus}`,
    });
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Order #12345</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500">Customer</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">+1 234 567 890</p>
            </div>
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-medium">Jan 15, 2023</p>
            </div>
            <div>
              <p className="text-gray-500">Delivery Date</p>
              <p className="font-medium">Jan 18, 2023</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium">
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Pending
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-500">Payment</p>
              <p className="font-medium">
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                  Unpaid
                </span>
              </p>
            </div>
          </div>
          
          <h3 className="font-bold text-lg mb-3">Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">T-Shirt</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">3</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Rs. 15</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Rs. 45</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Jeans</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">2</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Rs. 30</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Rs. 60</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Bedsheet</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">1</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Rs. 40</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Rs. 40</div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    Subtotal:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Rs. 145
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    Tax (5%):
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Rs. 7.25
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-bold">
                    Total:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">
                    Rs. 152.25
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* Update Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4">Update Status</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full bg-laundry-blue hover:bg-laundry-darkBlue"
                onClick={handleUpdateStatus}
              >
                Update Status
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4">Payment Status</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full bg-laundry-blue hover:bg-laundry-darkBlue"
                onClick={handleUpdatePayment}
              >
                Update Payment
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4">Actions</h3>
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                Print Receipt
              </Button>
              <Button className="w-full" variant="outline">
                Send SMS
              </Button>
              <Button className="w-full" variant="outline">
                Generate Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default DeliveryRequestDetail;
