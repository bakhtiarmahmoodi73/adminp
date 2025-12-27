import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import exchangeReducer from './slices/exchangeSlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exchange: exchangeReducer,
    forgotPassword: forgotPasswordReducer,   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;