import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
  cartItems: {
    items: [],
  },
  isLoading: false,
};

// Base URL for API requests
const baseUrl = import.meta.env.VITE_SHOP_APP_API_BASE_URL;

// Async action to add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(`${baseUrl}/api/shop/cart/add`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ userId }) => {
    // console.log("Fetching cart for userId (dynamic):", userId);
    const response = await axios.get(`${baseUrl}/api/shop/cart/get/${userId}`);
    return response.data;
  }
);

export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems ",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${baseUrl}/api/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);

export const updateCartItems = createAsyncThunk(
  "cart/updateCartItems ",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(`${baseUrl}api/shop/cart/update-cart`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

// Slice for shopping cart
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload.data,"action.payload.data");
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      // fetchCartItems
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.cartItems = action.payload.data;
        state.cartItems = action.payload.data;
        // console.log( action.payload," action.payload.data");
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      // updateCartItems
      .addCase(updateCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
        console.log(action.payload, " action.payload.data");
      })
      .addCase(updateCartItems.rejected, (state) => {
        state.isLoading = false;
        console.log(action.payload, " action.payload.data");

        state.cartItems = [];
      })
      // deleteCartItems
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
