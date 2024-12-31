import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "../ui/button";

const PaymentSuccess = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Handler for the "Continue Shopping" button
  const handleContinueShopping = () => {
    navigate("/shop/home"); // Navigate to the shop/home page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="text-4xl font-bold text-green-500 mb-4">Payment Successful!</div>
        <div className="text-xl text-gray-700 mb-6">
          Thank you for your purchase. Your payment has been processed successfully.
        </div>
        <Button
          onClick={handleContinueShopping} // Trigger navigation
          className="bg-green-500 text-white text-lg py-2 rounded-md shadow-md hover:bg-green-600 transition duration-200"
        >
          Continue Shopping
        </Button>
        <div className="mt-6 text-sm text-gray-500">
          <p>Need help? Reach our <a href="#" className="text-blue-400">Support Center</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
