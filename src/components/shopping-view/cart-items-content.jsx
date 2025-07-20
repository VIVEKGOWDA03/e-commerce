// Modernized UserCartItemsContent.js with icons and UX improvements
import { deleteCartItems, updateCartItems } from "@/store/cart-slice";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomToast from "../ui/CustomToast";

const UserCartItemsContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        setToast({ isVisible: true, message: "Item removed from cart", type: "success" });
      }
    });
  };

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    if (typeOfAction === "plus") {
      const existingItem = cartItems.items?.find(
        (item) => item.productId === getCartItem?.productId
      );
      const product = productList.find(
        (p) => p._id === getCartItem?.productId
      );
      const totalStock = product?.totalStock || 0;
      if (existingItem && existingItem.quantity + 1 > totalStock) {
        setToast({
          isVisible: true,
          message: `Only ${existingItem.quantity} items can be added.`,
          type: "info",
        });
        return;
      }
    }

    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem.quantity + 1
            : getCartItem.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setToast({
          isVisible: true,
          message: "Cart updated",
          type: "success",
        });
      }
    });
  };

  const getEffectivePrice =
    cartItem?.salePrice && cartItem.salePrice < cartItem.price
      ? cartItem.salePrice
      : cartItem.price;

  return (
    <div className="flex items-center justify-between w-full border-b py-4">
      <div className="flex items-center gap-4">
        <img
          className="w-20 h-20 object-cover rounded"
          src={cartItem?.image}
          alt={cartItem?.title}
          loading="lazy" 
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm text-gray-900">
            {cartItem?.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
              disabled={cartItem?.quantity === 1}
              className="h-8 w-8 flex items-center justify-center border rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium w-6 text-center">
              {cartItem?.quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
              className="h-8 w-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Delivery in <span className="text-green-600">7 days</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-semibold text-black">
          ₹{(getEffectivePrice * cartItem?.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => handleCartItemDelete(cartItem)}
          className="hover:text-red-600"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <CustomToast
        className="z-50"
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default UserCartItemsContent;
