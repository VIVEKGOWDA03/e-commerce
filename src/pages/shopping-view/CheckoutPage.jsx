import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "@/store/shop/order-slice";
import { motion } from "framer-motion";
import clsx from "clsx";

import accountImage from "../../assets/banners/account.jpg";
import CustomToast from "@/components/ui/CustomToast";
import Address from "@/components/shopping-view/Address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

// Icons
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const ShoppingCheckoutPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalUrl, isLoading } = useSelector((state) => state.shopOrder);

  const [currentSelectedAddres, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const totalCartAmount =
    Array.isArray(cartItems?.items) && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item.salePrice : item?.price) *
              item?.quantity,
          0
        )
      : 0;

  const handleInitiatePaypalPayment = () => {
    if (!cartItems.items.length) {
      return setToast({
        isVisible: true,
        message: "Your cart is empty. Please add items to proceed",
        type: "warning",
      });
    }

    if (!currentSelectedAddres) {
      return setToast({
        isVisible: true,
        message: "Please select an address to proceed",
        type: "info",
      });
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddres?._id,
        city: currentSelectedAddres?.city,
        pincode: currentSelectedAddres?.pincode,
        phone: currentSelectedAddres?.phone,
        notes: currentSelectedAddres?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder({ orderData })).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  useEffect(() => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    }
  }, [approvalUrl]);

  return (
    <motion.div
      className="max-w-7xl mx-auto mt-14 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden rounded-md shadow-md">
        <img
          className="h-full w-full object-cover object-center"
          src={accountImage}
          alt="account"
        />
      </div>

      {/* Main Checkout Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 bg-white p-6 rounded-lg shadow-lg">
        {/* Address Section */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <HiOutlineLocationMarker className="text-blue-600 text-2xl" />
            Delivery Address
          </h2>
          <Address
            selectedId={currentSelectedAddres?._id}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>

        {/* Cart + Summary */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FaShoppingCart className="text-green-600 text-lg" />
            Your Items
          </h2>

          <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
            {Array.isArray(cartItems?.items) && cartItems.items.length > 0 ? (
              cartItems.items.map((item) => (
                <motion.div
                  key={item._id}
                  className="border p-4 rounded-md shadow-sm bg-gray-50"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <UserCartItemsContent cartItem={item} />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No items in cart.</p>
            )}
          </div>

          {/* Total */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-medium text-gray-800">
              <span>Total</span>
              <span>₹{totalCartAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePaypalPayment}
              disabled={isPaymentStart || isLoading}
              className={clsx(
                "w-full py-2 px-4 rounded transition duration-200 text-white font-semibold",
                {
                  "bg-blue-600 hover:bg-blue-700": !isPaymentStart,
                  "bg-gray-400 cursor-not-allowed": isPaymentStart || isLoading,
                }
              )}
            >
              {isPaymentStart ? "Processing PayPal Payment..." : "Checkout with PayPal"}
            </Button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <CustomToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
        className="fixed bottom-6 right-6 shadow-lg z-50"
        icon={
          toast.type === "success" ? (
            <CheckCircleIcon className="h-6 w-6 text-green-600" />
          ) : (
            <XCircleIcon className="h-6 w-6 text-red-600" />
          )
        }
      />
    </motion.div>
  );
};

export default ShoppingCheckoutPage;
