import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/auth/Welcome";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signup" element={<Register />} />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/welcome" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
