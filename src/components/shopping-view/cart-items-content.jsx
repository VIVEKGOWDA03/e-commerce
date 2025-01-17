import { deleteCartItems, updateCartItems } from "@/store/cart-slice";
import { Minus, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomToast from "../ui/CustomToast";

const UserCartItemsContent = ({ cartItem }) => {
  // console.log(cartItems, "cartxxxxxxxxxxx");
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const { productList, isLoading, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.succes) {
        toast({
          title: "Cart item deleted succssfully ",
        });
      }
    });
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];
      {
        if (getCartItems.length) {
          const indexOfCurrentCartItem = getCartItems.findIndex(
            (items) => items.productId === getCartItem?.productId
          );
          const getCurrentProductIndex = productList.findIndex(
            (product) => product._id === getCartItem?.productId
          );
          // console.log(getCurrentProductIndex,getTotalStock,"getTotalStock");

          const getTotalStock = productList[getCurrentProductIndex].totalStock;
          if (indexOfCurrentCartItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
            if (getQuantity + 1 > getTotalStock) {
              setToast({
                isVisible: true,
                message: `Only ${getQuantity} items can be added.`,
                type: "info",
              });
              return;
            }
          }
        }
      }
    }
    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.succes) {
        toast({
          title: "Cart item is updated succssfully ",
        });
      }
    });
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        className="w-20 h-20 rounded object-cover"
        src={cartItem?.image}
        alt={cartItem?.title}
        loading="lazy"
      />
      <div className="flex-1">
        <h3 className="font-extrabold font-roboto"> {cartItem?.title}</h3>
        <div className="flex w-fit h-[25px]  rounded-md border-red-40 border-purple-500 border-opacity-30 border-[2px] items-center mt-1 gap-2">
          <button
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            variant="outline"
            disabled={cartItem?.quantity === 1}
            size="icon"
            className="flex justify-center items-center h-8 w-8 rounded-full"
          >
            <Minus className="w-4 h-4 bg-[#ED5448 rounded-sm" />
            <span className="sr-only">Decrease</span>
          </button>
          <span className="flex font-semibold justify-center items-center h-8 w-4">
            {cartItem?.quantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
            variant="outline"
            size="icon"
            className="flex justify-center items-center h-8 w-8 rounded-full"
          >
            <Plus className="w-4 h-4 bg-green-40 rounded-sm" />
            <span className="sr-only">Increase</span>
          </button>
        </div>
        <div className="pt-1">
          <p className="text-[14px] font-semibold text-black font-roboto">
            Delivery in <span className="text-green-400">7 days </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end font-roboto">
        <p className="font-semibold font-roboto">
          ₹
          {(
            (cartItem?.salePrice && cartItem.salePrice < cartItem.price
              ? cartItem.salePrice
              : cartItem.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>

        <button
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 size={10}"
        >
          <img className="w-10 h-10" src="/assets/icons/bin.png"></img>
        </button>
      </div>
      <CustomToast
        className="z-100"
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default UserCartItemsContent;
