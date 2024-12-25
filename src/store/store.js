import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/Product-Slice";
import AdminOrderSlice from "./admin/order-slice";
import shoppingProductsSlice from "./shop/products-slice";
import shoppingCartReducer from "./cart-slice";
import shopAddressSlice from "./shop/address-slice";
import ShopOrderSlice from "./shop/order-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    adminOrder: AdminOrderSlice,
    shopProducts: shoppingProductsSlice,
    shopCart: shoppingCartReducer,
    shopAddress: shopAddressSlice,
    shopOrder: ShopOrderSlice,
  },
});

export default store;
