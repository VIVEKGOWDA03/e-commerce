import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/shop/products/get"
    );
    return result?.data?.data || []; // Make sure we're returning the `data` array
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
