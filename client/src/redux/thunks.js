
import axios from "axios";
import { setAuthState } from "./slices/authSlice";

// Thunk for fetching user data
export const fetchUserData = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (!token) throw new Error("No token found");

    const response = await axios.get("user/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setAuthState({ token, user: response.data }));
  } catch (error) {
    console.error("Failed to fetch user data", error);
    dispatch(logout()); // Optionally handle logout on fetch error
  }
};
