import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { brandWithImages } from "@/config";
import { Card, CardContent } from "../ui/card";

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
      <SheetContent className="px-4 sm:max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-gray-800">
            {/* Your Cart */}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-14 space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          ) : (
            <div className=" flex flex-col ">
              <img
                className=""
                loading="lazy"
                src="/assets/icons/empcart.png"
              ></img>
              <p className="text-gray-500 text-center font-sixtyfour">
                Hey, it feels so light!
              </p>
              <p className="text-gray-400 font-[12px] text-center font-mono">
                There is nothing in your cart. Let's add some items
              </p>
            </div>
          )}
        </div>

        <div
          className={`${
            !cartItems && cartItems.length > 0 ? "block " : "hidden"
          } mt-6 border-t border-gray-200 pt-4`}
        >
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
          className={`${
            cartItems && cartItems.length > 0 ? "block " : "hidden"
          } mt-6 w-full bg-pink-500 font-roboto hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all`}
        >
          PLACE ORDER
        </Button>
        <section className="py-4 mt-4 bg-gray-100">
          <div className="container mx-auto px-2">
            <h2 className="text-xl font-bold text-center font-cairoPlay mb-8">
              Shop Your Favorite Brands
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2  gap-4">
              {brandWithImages.map((brandItem) => (
                <Card
                  onClick={() =>
                    handleNavigateToLisitingPage(brandItem, "Brand")
                  }
                  key={brandItem.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-">
                    <img
                      src={brandItem.image}
                      alt={`${brandItem.label} logo`}
                      className="w-12 h-12 mb-4 lg:block object-contain"
                      loading="lazy"
                    />
                    {/* <span className="font-bold">{brandItem.label}</span> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SheetContent>
    </div>
  );
};

export default UserCartWrapper;
