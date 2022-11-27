import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/autSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
