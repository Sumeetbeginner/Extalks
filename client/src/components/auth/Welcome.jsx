import React, {useEffect} from "react";
import "./auth.css";
import "./mauth.css";
import { useSelector } from "react-redux";
import appIllu from "../../assets/icons/appIllu.png";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <div className="welBlock">
        <img src={appIllu} alt="" />

        <div className="welInfo">
          <h2>Welcome to Extalks!</h2>
          <p>
            Dive into a world of insightful discussions and connect with a
            community of curious minds. Share your thoughts, explore diverse
            perspectives, and be part of the conversation!
          </p>
        </div>
      </div>

      <div className="regButtons">
        <button onClick={() => navigate("/signup")}>Signup</button>
        <button onClick={() => navigate("/login")}>Login</button>

        <p>© Sumeet Gupta</p>
      </div>
    </div>
  );
};

export default Welcome;
