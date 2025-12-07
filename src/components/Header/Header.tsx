"use client";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ButtonHeader } from "../styled/LoginStyled";

import Logo from "../../assets/images/logo/logoImage.svg?react";
import UserIcon from "../../assets/images/users/Frame (1).svg?react";
const menuItems = [
  { label: "Home", weight: 700, size: "16px", path: "/" },
  { label: "About Us", weight: 400, size: "16px", path: "/about" },
  { label: "Contact Us", weight: 400, size: "16px", path: "/contact" },
  { label: "Blog", weight: 400, size: "16px", path: "/blog" },
  { label: "FAQ", weight: 400, size: "16px", path: "/faq" },
];

const Header: FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        maxWidth: "1140px",
        width: "100%",
        margin: "0 auto",
        padding: 0,
        boxSizing: "border-box",
        display: "flex",
        backgroundColor: "transparent",
        boxShadow: "none",
        background: "inherit",
        border: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          boxSizing: "border-box",
          padding: 0,
          margin: 0,
        }}
      >
        <Box
          onClick={handleLogoClick}
          sx={{
            display: "block",
            width: "232px",
            height: "65px",
            marginTop: "52px",
            cursor: "pointer",
            marginBottom: 0,
            "& svg": {
              width: "100%",
              height: "100%",
              display: "block",
            }
          }}
        >
          <Logo />
        </Box>
        <Stack
          direction="row"
          sx={{
            all: "unset",
            display: "flex",
            flexDirection: "row",
            gap: "34px",
            marginTop: "74px",
            marginLeft: "142px",
            marginRight: "229px",
            boxSizing: "border-box",
            color: "#E4E4E4",
          }}
        >
          {menuItems.map((item) => (
            <Typography
              key={item.label}
              fontSize={item.size}
              onClick={() => handleMenuItemClick(item.path)}
              sx={{
                all: "unset",
                display: "inline-block",
                cursor: "pointer",
                color: "#E4E4E4",
                fontSize: item.size,
                fontWeight: item.weight,
                lineHeight: "100%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                "&:hover": { color: "#1976d2" },
                boxSizing: "border-box",
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Stack>

        <ButtonHeader 
          disableRipple 
          disableElevation 
          onClick={handleLoginClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "block",
              width: "24px",
              height: "24px",
              cursor: "pointer",
              marginRight: "16px",
              "& svg": {
                width: "100%",
                height: "100%",
                display: "block",
              }
            }}
          >
            <UserIcon />
          </Box>
          Login&nbsp;&nbsp;/&nbsp;Register
        </ButtonHeader>
      </Box>
    </Box>
  );
};

export default Header;