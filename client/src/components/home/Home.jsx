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
          <i onClick={() => navigate("/settings")} className="fas fa-cog"></i>

          {user.profilePic !== "" ? (
            <img
              onClick={() => navigate("/profile")}
              src={user.profilePic}
              alt="Profile Picture"
              
            />
          ) : user.gender === false ? (
            <img
              onClick={() => navigate("/profile")}
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              alt="Default Male Avatar"
            />
          ) : (
            <img
              onClick={() => navigate("/profile")}
              src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png"
              alt="Default Female Avatar"
            />
          )}
        </div>

     
      </div>
    </div>
  );
};

export default Home;
