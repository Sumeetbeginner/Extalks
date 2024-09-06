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
import { useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Search from './components/search/Search'
import AddQ from './components/addQuestion/AddQ'
import AddA from './components/addAnswer/AddA'
import Notification from './components/notification/Notifications'
import Setting from './components/setting/Setting'

const Main2 = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  const noNavbarP = [
    "/welcome",
    "/signup",
    "login",
    "/answerdetail",
    "/postdetail",
  ];

  return (
    <>
      {isAuthenticated && !noNavbarP.includes(location.pathname) && <Navbar />}
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
          path="/search"
          element={isAuthenticated ? <Search /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/addquestion"
          element={isAuthenticated ? <AddQ /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/postanswer"
          element={isAuthenticated ? <AddA /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/notifications"
          element={isAuthenticated ? <Notification /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <Setting /> : <Navigate to="/welcome" />}
        />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default Main2;
