import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import accountImage from "../../assets/banners/account.jpg";
import { createNewOrder } from "@/store/shop/order-slice";
import CustomToast from "@/components/ui/CustomToast";
import Address from "@/components/shopping-view/Address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

const ShoppingCheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalUrl, orderId, isLoading } = useSelector(
    (state) => state.shopOrder
  );

  const dispatch = useDispatch();
  const [currentSelectedAddres, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const totalCartAmount =
    cartItems && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePalpalPayment() {
    if (cartItems.items.length === 0) {
      setToast({
        isVisible: true,
        message: "Your cart is empty. Please add items to proceed",
        type: "warning",
      });
      return;
    }

    if (!currentSelectedAddres) {
      setToast({
        isVisible: true,
        message: "Please select an address to proceed",
        type: "info",
      });
      return;
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
  }

  useEffect(() => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    }
  }, [approvalUrl]);

  return (
    <div className="flex flex-col mt-14">
      <div className="relative h-full w-full overflow-hidden">
        <img
          className="h-full w-full object-contain object-center"
          src={accountImage}
          alt="account"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddres?._id}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item._id} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full font-roboto">
            <Button onClick={handleInitiatePalpalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with PayPal"}
            </Button>
          </div>
        </div>
      </div>
      <CustomToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default ShoppingCheckoutPage;
