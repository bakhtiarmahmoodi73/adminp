import { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ButtonHeader } from "../styled/LoginStyled";
import type { RootState, AppDispatch } from "../../store"; 
import { loadUserFromStorage } from "../../store/slices/authSlice";

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
  const location = useLocation(); 
  const dispatch = useDispatch<AppDispatch>();
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard"); 
    } else {
      navigate("/auth/login"); 
    }
  };

  const handleLogoClick = () => navigate("/");
  const handleMenuItemClick = (path: string) => navigate(path);

  return (
    <Box
      sx={{
        maxWidth: "1140px",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "none",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          onClick={handleLogoClick}
          sx={{
            display: "block",
            width: "232px",
            height: "65px",
            marginTop: "52px",
            cursor: "pointer",
            "& svg": { width: "100%", height: "100%", display: "block" }
          }}
        >
          <Logo />
        </Box>

        <Stack
          direction="row"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "34px",
            marginTop: "74px",
            marginLeft: "142px",
            marginRight: "auto", 
            color: "#E4E4E4",
          }}
        >
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;

            return (
              <Typography
                key={item.label}
                onClick={() => handleMenuItemClick(item.path)}
                sx={{
                  display: "inline-block",
                  cursor: "pointer",
                  lineHeight: "100%",
                  textTransform: "capitalize",
                  fontSize: item.size,
                  fontWeight: isSelected ? 700 : 400,
                  transition: "all 0.3s ease",
                }}
              >
                {item.label}
              </Typography>
            );
          })}
        </Stack>

        <ButtonHeader 
          disableRipple 
          disableElevation 
          onClick={handleLoginClick}
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            marginTop: "60px" 
          }}
        >
          <Box
            sx={{
              display: "block",
              width: "24px",
              height: "24px",
              marginRight: "16px",
              "& svg": { width: "100%", height: "100%", display: "block" }
            }}
          >
            <UserIcon />
          </Box>
          
          {isAuthenticated ? (
            <Typography sx={{ fontWeight: 400, color: "#E4E4E4", fontSize: "16px" }}>
              Saman.Shams
            </Typography>
          ) : (
            "Login / Register"
          )}
        </ButtonHeader>
      </Box>
    </Box>
  );
};

export default Header;