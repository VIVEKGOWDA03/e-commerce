import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};
const baseUrl = import.meta.env.VITE_AUTH_APP_BASE_URL;

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/register`, formData, {
        withCredentials: true,
      });
      return response.data; // Return the response data (e.g., success message)
    } catch (error) {
      return rejectWithValue(error.response.data); // Capture and return the error response
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(`${baseUrl}/login`, formData, {
    withCredentials: true,
  });
  return response.data;
});

// Async thunk for logout
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${baseUrl}/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
});

// Async thunk for auth check
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(`${baseUrl}/check-auth`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Expires: "0",
    },
  });
  return response.data;
});

// Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Registration failed";
        state.isAuthenticated = false;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("ggggg", action.payload.user);
        // state.user = action.payload.success ? action.payload.user : null;
        state.user = action.payload.success ? action.payload.user : null;

        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload?.message || "Login failed";
        state.isAuthenticated = false;
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
