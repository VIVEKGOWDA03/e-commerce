import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

const baseUrl = import.meta.env.VITE_SHOP_APP_API_BASE_URL;

export const getAllOrdersForAdmin = createAsyncThunk(
  "/orders/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(`${baseUrl}/admin/orders/get`, {});
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/orders/getOrderDetailsForAdmin",
  async ({ id }) => {
    const response = await axios.get(`${baseUrl}/admin/orders/details/${id}`, {});
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/orders/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(`${baseUrl}/admin/orders/update/${id}`, {
      orderStatus,
    });
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetAdminOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        console.error("Error fetching orders:", action.error);
      })
      // getOrderDetailsForAdmin
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
        console.log(action.payload.data, "action.payload.data");
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetAdminOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
