import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );
    console.log(`Sending request with query: ${query}`);
    return result?.data?.data || []; // Make sure we're returning the `data` array
  }
);

export const fetchProductsDetails = createAsyncThunk(
  "/products/fetchProductsDetails",
  async ({ id }) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${id}`
    );
    return result?.data?.data || [];
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
    builder.addCase(fetchAllFilteredProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    });
  },
});

export default shoppingProductsSlice.reducer;
