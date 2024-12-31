import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "@/store/shop/order-slice";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerId");

  useEffect(() => {
    if (paymentId && payerId) {
      const OrderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePayment({ paymentId, payerId, orderId: OrderId })).then(
        (data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/payment-success";
          }
        }
      );
    }
  }, [payerId, paymentId, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg text-center">
        <Card className="p-4 mb-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Please Wait...
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="mt-4 text-lg text-gray-700">
          We're processing your payment. Please wait a moment while we complete your transaction.
        </div>
        <div className="mt-6">
          <div className="w-16 h-16 border-t-4 border-b-4 border-gray-300 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default PaypalReturnPage;
