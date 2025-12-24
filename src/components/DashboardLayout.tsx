import { Outlet } from "react-router-dom";
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
import { Link} from "react-router-dom";

function DashboardLayout() {


  return (
    <CardContainerDashboard>
      <CardSideBarDashboard>
        {/* لینک داشبورد */}
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardDetailSideBar >
            <Home />
            <TypographySideBar>Dashboard</TypographySideBar>
          </CardDetailSideBar>
        </Link>

        {/* لینک پروفایل */}
        <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardDetailSideBar >
            <User />
            <TypographySideBar>Profile</TypographySideBar>
          </CardDetailSideBar>
        </Link>

        {/* لینک پارتنر پروگرام */}
        <Link to="/dashboard/partner" style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardDetailSideBar >
            <Partner />
            <TypographySideBar>Partner Program</TypographySideBar>
          </CardDetailSideBar>
        </Link>

        {/* خروج */}
        <CardDetailSideBar>
          <Exist />
          <TypographySideBar>Exit</TypographySideBar>
        </CardDetailSideBar>
      </CardSideBarDashboard>

      {/* محتوای صفحات مختلف */}
      <Outlet />
    </CardContainerDashboard>
  );
}

export default DashboardLayout;