import { styled } from "@mui/material/styles";

import { Container, Card, Button, Typography, TextField } from "@mui/material";

export const ContainerRoot = styled(Container)({
  maxWidth: "1140px",
  marginX: "auto",
  marginTop: "99px",
  height: "99px",
  backgroundColor: "#2A3342",
  borderRadius: "30px",
  borderColor: "#596B89",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const CardMainTop = styled(Card)({
  display: "flex",
  flexDirection: "column",

  maxWidth: "560px",
  margin: "35px auto 0",
  height: "213px",
  backgroundColor: "#2A3342",
  borderRadius: "30px",
  borderColor: "#596B89",

  // alignItems:"center",
  // justifyContent: "center",
});
export const CardMainBottm = styled(Card)({
  maxWidth: "560px",
  margin: "27px auto 0",
  height: "213px",
  backgroundColor: "#2A3342",
  borderRadius: "30px",
  borderColor: "#596B89",
  // display: "flex",
  // alignItems:"center",
  // justifyContent: "center",
});

export const ButtonMain = styled(Button)({
  width: "560px",
  margin: "27px auto 104px",
  height: "60px",
  backgroundColor: "#1D8D94",
  borderRadius: "10px",
  boxShadow: "0px 0px 20px 0px #1D8D9480",
  fontWeight: 700,
  fontSize: "16px",
  color: "#FFFFFF",
  display: "block",
});

export const TypographyMain = styled(Typography)({
  display: "block",
  fontSize: "16px",
  fontWeight: 700,
  color: "#ABABAB",
  marginTop: "40px",
  marginLeft: "39px",
  lineHeight: "1",
});

export const TextFieldMainTop = styled(TextField)({
   backgroundColor: "#242C39",
  borderRadius: "10px",
  height: "57px",
  width: "485px",
  marginTop: "22px",
  marginLeft: "39px",

  "& .MuiOutlinedInput-root": {
    paddingRight: 0,
    paddingLeft: 0,
    height: "57px",
    borderRadius: "10px",
  color: "#FFFFFF",
    fontSize: "14px",
    fontWeight:700
  },

 "& input": {
  textAlign: "left",
  paddingLeft: "20px",
  color: "#FFFFFF",
},
"& input::placeholder": {
  color: "#FFFFFF",
  opacity: 1,  
},
});


export const ChangeButtonComponent =styled(Button)({
  width:"69px",
  height:"69px",
  backgroundColor:"#242C39",
  borderRadius: "50%", 
  minWidth: "0",
  marginX:"auto",
  marginTop:"20px"
})




