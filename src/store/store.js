import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./Product-Slice";
import shoppingProductsSlice from "./shop/products-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    shopProducts: shoppingProductsSlice,
  },
});

export default store;
