import Address from "@/components/shopping-view/Address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import accountImage from "../../assets/banners/account.jpg";
import { createNewOrder } from "@/store/shop/order-slice";
import CustomToast from "@/components/ui/CustomToast";

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
  }); // Toast state

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
    // Check if the cart is empty
    if (cartItems.length === 0) {
      setToast({
        isVisible: true,
        message: "Your cart is empty. Please add items to proceed",
        type: "warning",
      });
      return; // Prevent further execution
    }

    // Check if no address is selected
    if (currentSelectedAddres === null) {
      setToast({
        isVisible: true,
        message: "Please Select one Address to proceed",
        type: "info",
      });
      return; // Prevent further execution
    }

    // Prepare the order data
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
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

    // Dispatch the action to create the order
    dispatch(createNewOrder({ orderData })).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true); // Set the payment to start
      } else {
        setIsPaymentStart(false); // Handle error in order creation
      }
    });
  }

  useEffect(() => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    }
  }, [approvalUrl]);

  return (
    <div className="flex flex-col ">
      <div className="relative h-[auto] w-full overflow-hidden ">
        <img
          className="hfull w-full object-cover object-center"
          src={accountImage}
          alt=""
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full btn ">
            <button onClick={handleInitiatePalpalPayment} className="w-full">
              Checkout with PayPal
            </button>
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
