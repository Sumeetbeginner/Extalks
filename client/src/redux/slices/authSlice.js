import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, isAuthenticated: false },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      Cookies.set("jwt", action.payload.token, { expires: 30 });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      Cookies.remove("jwt");
    },
    setAuthState: (state, action) => {
      console.log("setAuthState payload:", action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
  },
});

// Exporting Action Creators
export const { loginSuccess, logout, setAuthState } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
