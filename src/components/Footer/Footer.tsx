import { Box, Container, Typography } from "@mui/material";
import line from "../../assets/images/lines/Line 9.svg";

const Footer = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        maxWidth: "1140px",
        margin: "0 auto",
        backgroundColor: "transparent",
        boxShadow: "none",
        background: "inherit",
        border: "none",
        marginBottom: "18px",
      }}
    >
      <Box
        sx={{
          all: "unset",
          display: "block",
          maxWidth: "1140px",
          margin: "0 auto",
          backgroundColor: "transparent",
          boxShadow: "none",
          background: "inherit",
          border: "none",

          flexDirection: "column",
          alignItems: "center",
          position: "relative", 
        }}
      >
        <Box
          component="img"
          src={line}
          alt="line"
          sx={{
            all: "unset",
            display: "block",
            width: "1140px", 
            height: "1px", 
            backgroundColor: "#2E3E59",
            cursor: "pointer",
            marginBottom: "18px",
          }}
        />
        <Typography
          align="center"
          sx={{
            fontSize: "12px",
            color: "#ABABAB",
            marginTop: 0,
            position: "relative",
          }}
        >
          Copyright © 2024 repayment. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
