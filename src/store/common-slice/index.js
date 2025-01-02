import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
  error: null,
};

const baseUrl = import.meta.env.VITE_SHOP_APP_API_BASE_URL;

export const getFeatureImages = createAsyncThunk(
  "feature/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${baseUrl}/api/common/feature/get`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addFeatureImages = createAsyncThunk(
  "feature/addFeatureImages",
  async (image, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${baseUrl}/api/common/feature/add`, image);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "feature/deleteFeatureImage",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${baseUrl}/api/common/feature/delete/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const featureSlice = createSlice({
  name: "feature",
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
        state.error = null;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.featureImageList = [];
        state.error = action.payload;
      })
      .addCase(addFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFeatureImages.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = state.featureImageList.filter(
          (item) => item._id !== action.meta.arg
        );
        state.error = null;
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default featureSlice.reducer;
