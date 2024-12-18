import { useToast } from "@/hooks/use-toast";
import { deleteCartItems, updateCartItems } from "@/store/cart-slice";
import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserCartItemsContent = ({ cartItem }) => {
  // console.log(cartItems, "cartxxxxxxxxxxx");
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleCartItemDelete(getCartItem) {
    console.log("hello");

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
      />
      <div className="flex-1">
        <h3 className="font-extrabold"> {cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <button
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            variant="outline"
            disabled={cartItem?.quantity === 1}
            size="icon"
            className="flex justify-center items-center h-8 w-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
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
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (cartItem?.salePrice && cartItem.salePrice < cartItem.price
              ? cartItem.salePrice
              : cartItem.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>

        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 size={20}"
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
