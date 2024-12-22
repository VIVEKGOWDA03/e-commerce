import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};
const baseUrl = import.meta.env.VITE_SHOP_APP_BASE_URL;

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(`${baseUrl}/address/add`, formData);

    return response.data;
  }
);

export const fetchAllAddress = createAsyncThunk(
  "/addresses/fetchAllAddress",
  async ({userId}) => {
    const response = await axios.get(`${baseUrl}/address/get/${userId}`);

    return response.data;
  }
);
export const editAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({userId, addressId, formData}) => {
    const response = await axios.put(
      `${baseUrl}/address/edit/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({userId, addressId}) => {
    const response = await axios.delete(
      `${baseUrl}/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        // state.addressList = [];
      })
      //   for fetching address
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
