import { styled } from "@mui/material/styles";
import { Box, Card, Typography, Button, Link } from "@mui/material";


export const Img = styled("img")(({ theme }) => ({
  display: "block",
  backgroundColor: "#ffffff",
  width: '100%',
  maxWidth: 400,
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
}));



export const ButtonHeader = styled(Button)({
  all: "unset",
  display: "flex",
  backgroundColor: "red",
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
