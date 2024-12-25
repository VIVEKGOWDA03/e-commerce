import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "@/store/shop/order-slice";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const loaction = useLocation();
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
  }, [payerId, payerId, dispatch]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Please Wait</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PaypalReturnPage;
