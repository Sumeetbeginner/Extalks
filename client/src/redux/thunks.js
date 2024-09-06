import axios from "axios";
import { setAuthState, logout } from "./slices/authSlice.js";

// Thunk for fetching user data
export const fetchUserData = (token) => async (dispatch) => {
  try {
    if (!token) throw new Error("No token provided");

    const response = await axios.get("http://localhost:3001/user/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response.data);
    

    dispatch(setAuthState({ token, user: response.data }));
  } catch (error) {
    console.error("Failed to fetch user data", error);
    dispatch(logout()); 
  }
};
