import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "./redux/thunks";
import Cookies from "js-cookie";
import Welcome from "./components/auth/Welcome";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import ResetPassword from "./components/auth/ResetPassword";

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get("jwt");
      // console.log("Token from cookies:", token);

      if (token) {
        try {
          await dispatch(fetchUserData(token));
        } catch (error) {
          console.error("Fetch User Data Error:", error);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  useEffect(() => {
    // console.log("Current Auth State:", { isAuthenticated, user, token });
  }, [isAuthenticated, user, token]);

  if (loading) return <div className="loader"></div>;

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
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/resetpassword/:resetToken"
          element={ <ResetPassword /> }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
