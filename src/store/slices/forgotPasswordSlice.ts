import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface ForgotPasswordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ForgotPasswordState = {
  isLoading: false,
  error: null,
  success: false,
};

export const sendResetPasswordEmail = createAsyncThunk(
  'forgotPassword/sendResetPasswordEmail',
  async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email.includes('@')) {
      return { success: true, message: 'Email sent successfully' };
    } else {
      throw new Error('Invalid email address');
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: () => initialState,
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
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearError, resetState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;