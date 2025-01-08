import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div>
      <SheetContent className="sm:max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-gray-800">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItemsContent
                key={item.productId}
                cartItem={item}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg text-gray-700">Total</span>
            <span className="font-semibold text-lg text-gray-700">
              ₹{totalCartAmount}
            </span>
          </div>
        </div>

        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
        >
          Checkout
        </Button>
      </SheetContent>
    </div>
  );
};

export default UserCartWrapper;
