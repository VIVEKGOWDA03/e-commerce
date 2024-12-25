import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalUrl: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};
// const baseUrl = import.meta.env.VITE_SHOP_APP_BASE_URL;
const baseUrl = import.meta.env.VITE_ORDER_APP_BASE_URL;

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async ({ orderData }) => {
    const response = await axios.post(`${baseUrl}/order/create`, orderData);
    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ payerId, paymentId, orderId }) => {
    const response = await axios.post(`${baseUrl}/order/capture`, {
      payerId,
      paymentId,
      orderId,
    });
    return response.data;
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/order/getAllOrdersByUser",
  async ({ userId }) => {
    const response = await axios.get(`${baseUrl}/order/list/${userId}`, {});
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async ({ id }) => {
    const response = await axios.get(`${baseUrl}/order/details/${id}`, {});
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state, action) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        console.log("API Response Data:", action.payload);
        state.isLoading = false;
        state.approvalUrl = action.payload.approvalUrl;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
        state.error = null;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalUrl = null;
        state.orderId = null;
        state.error = action.payload || "An error occurred";
      })
      // getAllOrdersByUser
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        console.error("Error fetching orders:", action.error);
      })
      // getOrderDetails
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
        console.log(action.payload.data, "action.payload.data");
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
