import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/Product-Slice";
import AdminOrderSlice from "./admin/order-slice";
import shoppingProductsSlice from "./shop/products-slice";
import shoppingCartReducer from "./cart-slice";
import shopAddressSlice from "./shop/address-slice";
import ShopOrderSlice from "./shop/order-slice";
import ShopSearchSlice from "./shop/search-slice";
import ShopReviewSlice from "./shop/review-slice";
import commonSlice from "./common-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    adminOrder: AdminOrderSlice,
    shopProducts: shoppingProductsSlice,
    shopCart: shoppingCartReducer,
    shopAddress: shopAddressSlice,
    shopOrder: ShopOrderSlice,
    shopSearch: ShopSearchSlice,
    shopReview: ShopReviewSlice,
    commonfeature: commonSlice,
  },
});

export default store;
