import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// حذف export از interface و استفاده از type
type ForgotPasswordState = {
  isLoading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: ForgotPasswordState = {
  isLoading: false,
  error: null,
  success: false,
};

export const sendResetPasswordEmail = createAsyncThunk(
  'forgotPassword/sendEmail',
  async (email: string) => {
    // شبیه‌سازی API call برای ارسال ایمیل بازیابی
    const response = await new Promise<{ success: boolean }>((resolve, reject) => {
      setTimeout(() => {
        if (email && email.includes('@')) {
          resolve({ success: true });
        } else {
          reject(new Error('Invalid email address'));
        }
      }, 1000);
    });
    
    return response;
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendResetPasswordEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendResetPasswordEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to send reset email';
      });
  },
});

export const { clearError, resetState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;