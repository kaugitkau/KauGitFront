import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTrue: (state) => {
      state.isAuthenticated = true;
    },
    setFalse: (state) => {
      state.isAuthenticated = false;
    },
    logout: (state) => {
        state.isAuthenticated = false;
    },
  },
});

export const { setTrue, setFalse, logout } = authSlice.actions;
export default authSlice.reducer;
