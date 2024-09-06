import React, { useEffect } from "react";
import "./navbar.css";
import "./mnavbar.css";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/welcome");
    }
  }, [isAuthenticated]);

  // console.log(user);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navBody">   
      <div className="onlypc profileDetail">
        <img onClick={() => navigate('/profile')} src={user.profilePic} alt="" />
      </div>

      <div className={`compNav ${isActive("/") ? "active" : ""}`}>
        <i onClick={() => navigate("/")} className="fas fa-home"></i>
      </div>
      <div className={`compNav ${isActive("/search") ? "active" : ""}`}>
        <i onClick={() => navigate("/search")} className="fas fa-search"></i>
      </div>
      <div className={`compNav ${isActive("/addquestion") ? "active" : ""}`}>
        <i
          onClick={() => navigate("/addquestion")}
          className="fas fa-plus-circle"
        ></i>
      </div>
      <div className={`compNav ${isActive("/postanswer") ? "active" : ""}`}>
        <i onClick={() => navigate("/postanswer")} className="fas fa-edit"></i>
      </div>
      <div className={`compNav ${isActive("/notifications") ? "active" : ""}`}>
        <i
          onClick={() => navigate("/notifications")}
          className="fas fa-bell"
        ></i>
      </div>

      <div className="onlypc downNav">
        <div className={`compNav ${isActive("/settings") ? "active" : ""}`}>
          <i onClick={() => navigate("/settings")} className="fas fa-cog"></i>
        </div>
        <div>
          <i className="fas fa-power-off"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
