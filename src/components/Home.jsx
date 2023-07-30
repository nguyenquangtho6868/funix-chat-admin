import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NavbarComponent from "./Navbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AuthContext } from "../Context/AuthProvider";
import "../css/home.css";

function HomeComponent() {
  const navigate = useNavigate();
  const { isNav, setIsNav } = useContext(AuthContext);

  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    if (!checkToken) {
      alert("You must to login!");
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="home row">
      <NavbarComponent />
      <div className="col-lg-2 home-left sidebar dashboard-header">
        <div
          className={
            isNav
              ? "main sidebar-item ipad sidebar-ipad-open"
              : "main sidebar-item ipad sidebar-ipad-close"
          }
        >
          <div className="main-title pt-2 pb-2">
            <Typography variant="h5" gutterBottom className="main-title-text">
              MAIN
            </Typography>
            <div className="main-title-icon">
              <IconButton
                color="black"
                aria-label="open drawer"
                edge="start"
                onClick={() => setIsNav(false)}
              >
                <ChevronLeftIcon className="main-title-icon-item"></ChevronLeftIcon>
              </IconButton>
            </div>
          </div>
          <Link
            to={"/home/"}
            className="main-item-link mb-4"
            onClick={() => setIsNav(false)}
          >
            <div className="main-item">
              <AccountCircleIcon />
              <h6 className="ml-2">Users</h6>
            </div>
          </Link>
          <Link
            to={"/home/courses"}
            className="main-item-link"
            onClick={() => setIsNav(false)}
          >
            <div className="main-item">
              <MenuBookIcon />
              <h6 className="ml-2">Courses</h6>
            </div>
          </Link>
        </div>

        <div className="main sidebar-item pc">
          <div className="main-title pt-2 pb-2">
            <Typography variant="h5" gutterBottom className="main-title-text">
              MAIN
            </Typography>
            <div className="main-title-icon">
              <IconButton color="black" aria-label="open drawer" edge="start">
                <ChevronLeftIcon className="main-title-icon-item"></ChevronLeftIcon>
              </IconButton>
            </div>
          </div>
          <Link to={"/home/"} className="main-item-link mb-4">
            <div className="main-item">
              <AccountCircleIcon />
              <h6 className="ml-2">Users</h6>
            </div>
          </Link>
          <Link to={"/home/courses"} className="main-item-link">
            <div className="main-item">
              <MenuBookIcon />
              <h6 className="ml-2">Courses</h6>
            </div>
          </Link>
        </div>
      </div>

      <div className="col-lg-10 col-md-12 home-right dashboard-header">
        <div className="top"></div>
        <Outlet />
      </div>
    </div>
  );
}

export default HomeComponent;
