import { styled } from "@mui/material/styles";
import { Box, Card, Typography, Button, Link } from "@mui/material";

export const Img = styled("img")(() => ({
  display: "block",
  width: "24px",
  height: "24px",
  cursor: "pointer",
  marginRight: "16px",
  boxSizing: "border-box",
  marginLeft: 0,
}));

export const ButtonHeader = styled(Button)({
  display: "flex",
  cursor: "pointer",
  color: "#E4E4E4",
  marginTop: "55px",
  fontSize: "16px",
  textTransform: "none",
  lineHeight: "100%",
  letterSpacing: "0%",
  boxSizing: "border-box",
  fontFamily: "Niramit",
  backgroundColor: "inherit",
  padding: 0,
});

export const LoginCardContainer = styled(Card)(({ theme }) => ({
  all: "unset",
  display: "flex",
  flexDirection: "column",
  maxWidth: "560px",
  width: "100%",
  borderRadius: "30px",
  margin: "157px auto 152px",
  backgroundColor: theme.palette.mode === "dark" ? "#2A3342" : "#fff",
}));

export const FormBox = styled(Box)({
  width: "485px",
  margin: "15px auto 0",
  position: "relative",
});

export const LabelText = styled(Typography)(({ theme }) => ({
  display: "block",
  marginTop: "31px",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  marginLeft: "39px",
  fontSize: "16px",
}));

export const LoginButton = styled(Button)({
  marginTop: "46px",
  backgroundColor: "#1D8D94",
  width: "485px",
  height: "60px",
  marginLeft: "39px",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: 700,
  color: "#FFFFFF",
  textTransform: "none",
  boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
  "&:hover": {
    backgroundColor: "#16666c",
  },
});

export const CustomLink = styled(Link)({
  color: "#1D8D94",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}) as typeof Link;

export const TypographyLogin = styled(Typography)(({
  fontSize: "36px",
  fontWeight: 700,
  background: "linear-gradient(91.79deg, #1D8D94 2.58%, #91D2A3 126.11%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "block", // تغییر این خط
  margin: 0, // اضافه کردن این
  padding: 0,

}));

