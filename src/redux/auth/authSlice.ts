import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('auth_token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('auth_token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('auth_token');
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
