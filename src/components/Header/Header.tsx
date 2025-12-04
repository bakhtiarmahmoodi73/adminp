"use client";
import { FC } from "react";
import { useNavigate } from "react-router-dom"; // اضافه کردن useNavigate
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button, Container } from "@mui/material";
import logo from "../../assets/images/logo/logoImage.svg";
import user from "../../assets/images/users/Frame (1).svg";

const menuItems = [
  { label: "Home", weight: 700, size: "16px", path: "/" },
  { label: "About Us", weight: 400, size: "16px", path: "/about" },
  { label: "Contact Us", weight: 400, size: "16px", path: "/contact" },
  { label: "Blog", weight: 400, size: "16px", path: "/blog" },
  { label: "FAQ", weight: 400, size: "16px", path: "/faq" },
];

const Header: FC = () => {
  const navigate = useNavigate(); // استفاده از هوک navigate

  const handleLoginClick = () => {
    navigate("/auth/login"); // هدایت به صفحه login
  };

  const handleLogoClick = () => {
    navigate("/"); // هدایت به صفحه اصلی
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        maxWidth: "1140px",
        width: "100%",
        margin: "0 auto",
        padding: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
        background: "inherit",
        border: "none",
      }}
    >
      <Box
       sx={{
    all: "unset",       // حذف کامل تمام استایل‌های پیش‌فرض
    display: "flex",    // بازگردانی تنها چیزی که می‌خواهی
    boxSizing: "border-box",
    padding:0,
    margin:0
  }}
      >
        <Box
  component="img"
  src={logo}
  alt="Logo"
  onClick={handleLogoClick}
  sx={{
    all: "unset",     // پاک کردن همه استایل‌های اولیه
    display: "block", // لازم چون unset آن را inline می‌کند
    width: "232px",
    height: "65px",
    marginTop: "52px",
    cursor: "pointer",
    marginBottom:0
  }}
/>

        {/* ---- Navigation Menu ---- */}
       <Stack
  direction="row"
  
  sx={{
    all: "unset",            // حذف کامل تمام استایل‌ها
    display: "flex",         // بازگرداندن رفتار Flex از دست‌رفته
    flexDirection: "row",    // چون direction را unset حذف می‌کند
    gap: "34px",             // جایگزین spacing (چون spacing دیگر کار نمی‌کند)
    marginTop: "74px",
    marginLeft: "148px",
    marginRight: "229px",
    boxSizing: "border-box",
    color:"#E4E4E4"
  }}
>

          {menuItems.map((item) => (
            <Typography
              key={item.label}
              fontSize={item.size}
              onClick={() => handleMenuItemClick(item.path)} // اضافه کردن onClick برای منوها
       sx={{
    all: "unset",               // حذف کامل استایل‌های پیش‌فرض MUI
    display: "inline-block",
    cursor: "pointer",
    color: "#E4E4E4",
    fontSize: item.size,
    fontWeight: item.weight,

    lineHeight: "100%",         // خط فاصله
    letterSpacing: "0%",        // لتر اسپیسینگ صفر
    textTransform: "capitalize", // تایتل کیس

    "&:hover": { color: "#1976d2" },
    boxSizing: "border-box",
  }}
            >
              {item.label}
            </Typography>
          ))}
        </Stack>

        {/* ---- Right Section (User + Login/Register) ---- */}
        <Stack direction="row"
  sx={{
    all: "unset",        // حذف کامل تمام استایل‌های پیش‌فرض MUI
    display: "flex",     // بازگردانی رفتار Flex
    flexDirection: "row",
    boxSizing: "border-box",
  }}>
          <Stack  direction="row"
    sx={{
      all: "unset",
      display: "flex",
      flexDirection: "row",
      boxSizing: "border-box",
    }}>
            <Box
              component="img"
      src={user}
      alt="user"
      sx={{
        all: "unset",     // حذف تمام استایل‌های پیش‌فرض <img> + MUI Box
        display: "block", // چون unset باعث inline می‌شود، باید block بدهیم
        width: "24px",
        height: "24px",
        marginTop: "68px",
        cursor: "pointer",
        boxSizing: "border-box",
        marginLeft:0
      }}
            />

            <Box sx={{
    all: "unset",       // حذف کامل همه استایل‌های پیش‌فرض MUI
    display: "block",   // چون unset باعث inline شدن می‌شود
    boxSizing: "border-box",
  }}>
              <Button
                  onClick={handleLoginClick}
                  disableRipple
    disableFocusRipple
    sx={{
      all: "unset",         // حذف کامل استایل‌های پیش‌فرض MUI Button
      display: "inline-block", 
      cursor: "pointer",
      color: "#E4E4E4",
      fontSize: "16px",
      fontWeight: 400,
      marginTop: "72px",
      marginLeft: "13px",
      textTransform: "none",
      lineHeight: "100%",
      letterSpacing: "0%",
      boxSizing: "border-box",
      fontFamily: 'Niramit',
     marginRight:0
    }}
              >
                Login&nbsp;&nbsp;/&nbsp;Register
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Header;
