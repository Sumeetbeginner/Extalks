import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import appLogo from "../../assets/icons/appLogo.png";
import "./auth.css";
import "./mauth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      const { user, token } = response.data;
      // console.log(user);
      // console.log(token);

      dispatch(loginSuccess({ user, token }));

      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="mainRegBox">
      <div className="topBoxReg">
        <h3>Register On</h3>
        <div className="flexAppTitle">
          <h1>Exta</h1>
          <img src={appLogo} alt="App Logo" />
          <h1>ks</h1>
        </div>
      </div>

      <div className="bottomBoxReg">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your Registered Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        />

        <button className="loginBtn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
