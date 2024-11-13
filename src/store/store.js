import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'; // This import is now correct

const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

export default store;
