import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    // اعتبارسنجی ساده: هر ایمیل و رمزی که وارد شود قبول است
    // (در محیط واقعی باید با API چک شود)
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    const isValidPassword = (password: string) => {
      return password.length >= 6; // حداقل 6 کاراکتر
    };
    
    // اعتبارسنجی ایمیل و رمز
    if (!isValidEmail(credentials.email)) {
      throw new Error('Please enter a valid email address');
    }
    
    if (!isValidPassword(credentials.password)) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    // شبیه‌سازی پاسخ API
    const response = await new Promise<{ user: User; token: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          user: { 
            id: Date.now().toString(), // ID یکتا
            email: credentials.email, 
            name: credentials.email.split('@')[0] // نام از ایمیل استخراج می‌شود
          },
          token: 'mock-jwt-token-' + Date.now()
        });
      }, 1000);
    });
    
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    // افزودن reducer برای بارگذاری کاربر از localStorage
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          state.user = JSON.parse(userStr);
          state.token = token;
          state.isAuthenticated = true;
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, clearError, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;