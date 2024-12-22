import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalUrl: null,
  isLoading: false,
  orderId: null,
};
const baseUrl = import.meta.env.VITE_SHOP_APP_BASE_URL;

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async ({ orderData }) => {
    const response = await axios.post(`${baseUrl}/order/create`, orderData);
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload); // Debugging API Response
        state.isLoading = false;
        state.approvalUrl = action.payload.approvalUrl;
        state.orderId = action.payload.orderId;
        state.error = null;
      })

      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalUrl = null;
        state.orderId = null;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default shoppingOrderSlice.reducer;
