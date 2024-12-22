import Address from "@/components/shopping-view/Address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import accountImage from "../../assets/banners/account.jpg";
import { createNewOrder } from "@/store/shop/order-slice";

const ShoppingCheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalUrl, orderId } = useSelector((state) => state.shopOrder);



  const dispatch = useDispatch();
  // console.log(cartItems, "cartItems");
  const [currentSelectedAddres, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  // console.log(currentSelectedAddres, "currentSelectedAddres");

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
    const orderData = {
      userId: user?.id,
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
    // console.log(orderData, "orderData");
    dispatch(createNewOrder({ orderData })).then((data) => {
      // console.log(data, "vivek");
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
    <div className="flex flex-col ">
      <div className="relative h-[auto] w-full overflow-hidden ">
        <img
          className="h=full w-full object-cover object-center"
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
    </div>
  );
};

export default ShoppingCheckoutPage;
