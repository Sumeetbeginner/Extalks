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

  const [loading, setLoading] = useState(false);

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

  const validateEmail = (emailBhai) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailBhai);
  };

  const sendResetLink = async () => {
    if (!validateEmail(email)) {
      alert("⚠️ Kindly Enter the Correct Email ID");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setEmail("");
        alert("✅ Password Reset Link has been sent to your Registered Email");
      } else {
        setLoading(false);
        setEmail("");
        alert("⚠️ Failed Sending Password Reset Link");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  if (loading) return <div className="loader"></div>;

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

        <p className="alreadyUser">
          Forgot Password? <span onClick={sendResetLink}>Reset Password</span>
        </p>

        <p className="orS">OR</p>

        <p className="alreadyUser" onClick={() => navigate("/signup")}>
          New User? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
