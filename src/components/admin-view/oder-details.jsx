import React, { useEffect, useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/Form";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { data } from "autoprefixer";
import CustomToast from "../ui/CustomToast";
const initialFormData = {
  Status: "",
};
const AdminOrderDetailsView = ({ orderDetails, isLoading }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  }); 
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { Status: status } = formData;

    if (!status) {
      console.error("Status is required!");
      return;
    }

    dispatch(
      updateOrderStatus({
        id: orderDetails?._id,
        orderStatus: status,
      })
    )
      .unwrap()
      .then((data) => {
        if (data?.success) {
          setToast({
            isVisible: true,
            message: "Order Status Updated",
            type: "success",
          });
          // Fetch the updated order details
          dispatch(getOrderDetailsForAdmin({ id: orderDetails?._id }))
            .unwrap()
            .then(() => {
              dispatch(getAllOrdersForAdmin()); // Optionally update all orders
              setFormData(initialFormData); // Reset form after success
            });
        }
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen absolute inset-0 bg-white bg-opacity-50">
        <div className="flex items-center">
          <Spinner size="large" color="red" />
          {/* <p className="ml-4 text-lg font-medium">Loading orders, please wait...</p> */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <DialogContent className="sm:max-w-[600px] bg-yellow-50">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex mt-6  items-center justify-between">
              <p className="font-medium "> Order Id </p>
              <Label>{orderDetails?._id}</Label>
            </div>
            <div className="flex mt-2  items-center justify-between">
              <p className="font-medium "> Order Date </p>
              <Label> {orderDetails?.orderDate.split("T")[0]}</Label>
            </div>
            <div className="flex mt-2  items-center justify-between">
              <p className="font-medium "> Order Price </p>
              <Label>₹ {orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex mt-2  items-center justify-between">
              <p className="font-medium "> Payment Method </p>
              <Label> {orderDetails?.paymentMethod}</Label>
            </div>
            <div className="flex mt-2  items-center justify-between">
              <p className="font-medium "> Payment Status </p>
              <Label> {orderDetails?.paymentStatus}</Label>
            </div>
            <div className="flex mt-2  items-center justify-between">
              <p className="font-medium "> Order Status </p>
              <Label>
                <Badge
                  className={`px-3 py-1 hover:bg-orange-600 ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderDetails?.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-orange-400"
                  }`}
                >
                  {orderDetails?.orderStatus
                    ? orderDetails.orderStatus.charAt(0).toUpperCase() +
                      orderDetails.orderStatus.slice(1)
                    : ""}
                </Badge>
              </Label>
            </div>
          </div>
          <Separator />
          <hr></hr>
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3 ">
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems.map((item) => (
                      <li className="flex items-center justify-between">
                        <span>Title: {item?.title}</span>
                        <span>Quantity: {item?.quantity}</span>
                        <span> Price: ₹ {item?.price}</span>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <div className="font-medium">Shipping info</div>
              <div className="grid gap-0.5 text-muted">
                <span className="text-black">{user?.userName}</span>
                <span className="text-black">
                  {orderDetails?.addressInfo?.address}
                </span>
                <span className="text-black">
                  {orderDetails?.addressInfo?.city}
                </span>
                <span className="text-black">
                  {orderDetails?.addressInfo?.pincode}
                </span>
                <span className="text-black">
                  {orderDetails?.addressInfo?.phone}
                </span>
                <span className="text-black">
                  {orderDetails?.addressInfo?.notes}
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              onSubmit={handleUpdateStatus}
              formControls={[
                {
                  label: "Order Status",
                  name: "Status",
                  componenttype: "select",
                  options: [
                    {
                      id: "pending",
                      label: "Pending",
                    },
                    {
                      id: "inProcess",
                      label: "In Process",
                    },
                    {
                      id: "inShipping",
                      label: "In Shipping",
                    },
                    {
                      id: "deliverd",
                      label: "Deliverd",
                    },
                    {
                      id: "rejected",
                      label: "Rejected",
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </DialogContent>
      <CustomToast className="z-100"
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default AdminOrderDetailsView;
