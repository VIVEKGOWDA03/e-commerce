import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};
const baseUrl = import.meta.env.VITE_SHOP_APP_BASE_URL;

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(`${baseUrl}/products/get?${query}`);
    // console.log(`Sending request with query: ${query}`);
    return result?.data?.data || []; // Make sure we're returning the `data` array
  }
);

export const fetchProductsDetails = createAsyncThunk(
  "/products/fetchProductsDetails",
  async ({ id }) => {
    const result = await axios.get(`${baseUrl}/products/get/${id}`);
    return result?.data;
  }
);

const shoppingProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFilteredProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload; // Now it directly holds the array of products
    });
    builder
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })

      // for all product details
      .addCase(fetchProductsDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data; // Now it directly holds the array of products
      })
      .addCase(fetchProductsDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shoppingProductsSlice.reducer;
