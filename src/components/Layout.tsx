// src/components/Layout.tsx
import { Box } from "@mui/material";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        m: 0,
        p: 0,
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          p: 0,
          m: 0,
          width: "100%",
          maxWidth: "100% !important",
        }}
      >
        <Outlet />
      </Box>

      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
