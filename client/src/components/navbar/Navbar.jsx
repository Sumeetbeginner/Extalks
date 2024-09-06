import React from "react";
import "./navbar.css";
import "./mnavbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {

  const user = useSelector((state) => state.auth.user);

  // console.log(user);
  

  return (
    <div className="navBody">

      <div className="onlypc profileDetail">
        <img src={user.profilePic} alt="" />
      </div>

     

      <div className="compNav">
        <i className="fas fa-home"></i>
      </div>
      <div className="compNav">
        <i className="fas fa-search"></i>
      </div>
      <div className="compNav">
        <i className="fas fa-plus-circle"></i>
      </div>
      <div className="compNav">
        <i className="fas fa-edit"></i>
      </div>
      <div className="compNav">
        <i className="fas fa-bell"></i>
      </div>

      <div className="onlypc downNav">
      <div className="compNav">
        <i className="fas fa-cog"></i>
      </div>
      <div className="compNav">
        <i className="fas fa-power-off"></i>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
