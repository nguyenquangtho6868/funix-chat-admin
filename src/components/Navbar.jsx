import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import DehazeIcon from "@mui/icons-material/Dehaze";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import "../css/navbar.css";

function NavbarComponent() {
  const { username, setIsNav } = useContext(AuthContext);
  const navigate = useNavigate();

  const clearUser = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-name header-left">
        <h5 className="header-name-item">Dashboard</h5>
        <div className="header-name-item-sm-md">
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={() => setIsNav(true)}
          >
            <DehazeIcon color="primary" />
          </IconButton>
        </div>
      </div>

      <div className="header-logo">ADMIN</div>

      <div className="header-user header-right">
        <div className="header-right-ipad-pc">
          <div className="display-flex">
            <div className="header-user-item header-right-flex">
              <div className="header-user-item-icon">
                <i className="fa-regular fa-circle-user"></i>
              </div>
              <p className="header-user-item-name">{username}</p>
            </div>
            <div
              className="header-user-item  d-none d-md-block "
              onClick={clearUser}
            >
              <p className="header-user-item-logout">Logout</p>
            </div>
          </div>
        </div>
        <div className="header-name-item-sm-md header-right-mobile">
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={clearUser}
          >
            <LogoutIcon color="primary" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default NavbarComponent;
