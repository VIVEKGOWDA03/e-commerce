import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
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
      <SheetContent className="sm:max-w-md bg-white">
        <SheetHeader>
          <SheetTitle className="text-[black]">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">₹{totalCartAmount}</span>
          </div>
        </div>
        <button className="btn w-full mt-6">Checkout</button>
      </SheetContent>
    </div>
  );
};

export default UserCartWrapper;
