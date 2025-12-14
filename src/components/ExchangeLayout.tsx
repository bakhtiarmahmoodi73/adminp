import { Box } from "@mui/material";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import TopComponent from "./mainpage/TopComponent"; // اضافه کردن استپر

const ExchangeLayout = () => {
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
        {/* استپر اضافه شده */}
        <TopComponent />
        <Outlet />
      </Box>

      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default ExchangeLayout;