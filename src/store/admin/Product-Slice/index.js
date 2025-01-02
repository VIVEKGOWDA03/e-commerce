import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Ensure axios is imported

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

// Add new product
const baseUrl = import.meta.env.VITE_SHOP_APP_API_BASE_URL;

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct", // Change action name to be unique
  async (formdata) => {
    const result = await axios.post(
      ` ${baseUrl}/api/admin/products/add`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// Fetch all products
export const fetchAllProduct = createAsyncThunk(
  "/products/fetchallproducts", // Change action name to be unique
  async () => {
    const result = await axios.get(
      ` ${baseUrl}/api/admin/products/get`,

    );
    return result?.data;
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  "/products/editproduct", // Change action name to be unique
  async ({ formData, id }) => {
    const result = await axios.put(
      ` ${baseUrl}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct", // Change action name to be unique
  async ({ id }) => {
    const result = await axios.delete(
      ` ${baseUrl}/api/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message; // Handle the error message
      });

    builder
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // You may want to add the newly added product to the productList
        state.productList.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Handle the error message
      });
  },
});

export default AdminProductSlice.reducer;
