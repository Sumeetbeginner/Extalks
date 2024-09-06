import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
 
  const navigate = useNavigate();

  return (
    <div>
      <div className="onlymobile">
        <div className="topNavbar">
          <i className="fas fa-cog"></i>
          <img src={user.profilePic} alt="" />
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
