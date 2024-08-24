import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthState, logout } from "./redux/slices/authSlice";
import { fetchUserData } from "./redux/thunks";
import Welcome from "./components/auth/Welcome";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Function to get token from cookies
    const getTokenFromCookies = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];
      return token || null;
    };

    const token = getTokenFromCookies();

    if (token) {
      dispatch(setAuthState({ token }));
      dispatch(fetchUserData()); // Fetch user data
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/welcome" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
