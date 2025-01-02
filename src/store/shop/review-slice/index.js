import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};
const baseUrl = import.meta.env.VITE_SHOP_APP_API_BASE_URL;

export const addReview = createAsyncThunk(
  "/review/addReview",
  async ({ formData }) => {
    const result = await axios.post(`${baseUrl}/api/shop/review/add`, formData);
    return result?.data;
  }
);

export const getReview = createAsyncThunk(
  "/review/getReview",
  async ({ id }) => {
    console.log("Fetching reviews for product ID:", id); // Debugging
    const result = await axios.get(`${baseUrl}/api/shop/review/${id}`);
    console.log("API response:", result?.data); // Debugging
    return result?.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReview.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("API Data:", action.payload);
      state.reviews = action.payload.data;
    });
    builder.addCase(getReview.rejected, (state) => {
      state.isLoading = false;
      state.reviews = [];
    });
  },
});

export default reviewSlice.reducer;
