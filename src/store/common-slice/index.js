import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

const baseUrl = import.meta.env.VITE_SHOP_APP_API_BASE_URL;

export const getFeatureImages = createAsyncThunk(
  "/search/getFeatureImages",
  async () => {
    const result = await axios.get(`${baseUrl}/common/feature/get`);
    return result?.data;
  }
);

export const addFeatureImages = createAsyncThunk(
  "/search/addFeatureImages",
  async (image) => {
    const result = await axios.post(`${baseUrl}/common/feature/add`, image);
    return result?.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
