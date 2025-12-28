import { Outlet, Link, useLocation } from "react-router-dom";
import {
  CardContainerDashboard,
  CardDetailSideBar,
  CardSideBarDashboard,
  TypographySideBar,
} from "./styled/HompageStylee";
import Home from "../assets/images/sidebar/Vector.svg?react";
import User from "../assets/images/sidebar/Vector (1).svg?react";
import Partner from "../assets/images/sidebar/Vector (2).svg?react";
import Exist from "../assets/images/sidebar/Vector (3).svg?react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function DashboardLayout() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/auth/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const getSelectedStyles = (path: string) => ({
    "& svg, & svg path": {
      stroke: isActive(path) ? "#FFFFFF !important" : "#ABABAB",
      fill: isActive(path) ? "transparent" : " #2A3342",
      transition: "all 0.3s ease",
    },
    "& .MuiTypography-root": {
      fontWeight: isActive(path) ? "600 !important" : "400 !important",
      color: isActive(path) ? "#FFFFFF !important" : "#ABABAB",
      transition: "all 0.3s ease",
    },
  });

  return (
    <>
      <Header />

      <CardContainerDashboard>
        <CardSideBarDashboard>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CardDetailSideBar sx={getSelectedStyles("/dashboard")}>
              <Home />
              <TypographySideBar>Dashboard</TypographySideBar>
            </CardDetailSideBar>
          </Link>
          <Link
            to="/dashboard/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CardDetailSideBar sx={getSelectedStyles("/dashboard/profile")}>
              <User />
              <TypographySideBar>Profile</TypographySideBar>
            </CardDetailSideBar>
          </Link>
          <Link
            to="/dashboard/partner"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CardDetailSideBar sx={getSelectedStyles("/dashboard/partner")}>
              <Partner />
              <TypographySideBar>Partner Program</TypographySideBar>
            </CardDetailSideBar>
          </Link>
          <div
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "inherit" }}
          >
            <CardDetailSideBar>
              <Exist />
              <TypographySideBar sx={{ fontWeight: "400 !important" }}>
                Exit
              </TypographySideBar>
            </CardDetailSideBar>
          </div>
        </CardSideBarDashboard>

        <Outlet />
      </CardContainerDashboard>

      <Footer />
    </>
  );
}

export default DashboardLayout;
