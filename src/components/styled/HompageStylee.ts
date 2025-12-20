import { styled } from "@mui/material/styles";

import {
  Container,
  Card,
  Button,
  Typography,
  TextField,
  Box,
  Checkbox,
  TextareaAutosize,
} from "@mui/material";

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
  padding: 0,
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
});
export const CardMainBottm = styled(Card)({
  maxWidth: "560px",
  margin: "27px auto 0",
  height: "213px",
  backgroundColor: "#2A3342",
  borderRadius: "30px",
  borderColor: "#596B89",
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
    fontWeight: 700,
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

export const ChangeButtonComponent = styled(Button)({
  width: "69px",
  height: "69px",
  backgroundColor: "#242C39",
  borderRadius: "50%",
  minWidth: "0",
  marginX: "auto",
  marginTop: "20px",
});

export const ContainerConfirm = styled(Container)({
  maxWidth: "1140px",
  marginX: "auto",
  marginTop: "33px",
  marginBottom: "115px",
  height: "909px",
  backgroundColor: "#2A3342",
  borderRadius: "30px",
  borderColor: "#596B89",
  display: "flex",
  flexDirection: "column",
  padding: 0,
});

export const TypographyConfirm = styled(Typography)({
  display: "block",
  fontSize: "24px",
  fontWeight: 700,
  color: "#FFFFFF",
  marginTop: "29px",
  marginLeft: "77px",
  lineHeight: "1",
});

export const BoxConfirmRoot = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginTop: "43px",
  marginLeft: "77px",
  marginRight: "77px",
});

export const BoxConfirmDetail = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const TypographyDetail = styled(Typography)({
  display: "block",
  fontSize: "20px",
  fontWeight: 700,
  color: "#ABABAB",
  marginTop: "0px",
  lineHeight: "1",
});
export const BoxDetail = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
});

export const CustomInput = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    color: "#FFFFFF",
    fontSize: "14px",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#FFFFFF",
    opacity: 1,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#242C39",
  },
});

export const BoxCircle = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  backgroundColor: "#1D8D94",
  color: "#FFFFFF",
  fontWeight: 700,
  fontSize: "14px",
});
export const TypographyRule = styled(Typography)({
  display: "block",
  fontSize: "16px",
  fontWeight: 300,
  color: "#FFFFFF",
  marginTop: "0px",
  textTransform: "none !important",
  fontVariant: "normal",
});

export const CustomCheckbox = styled(Checkbox)({
  backgroundColor: "#242C39",
  borderRadius: "8px",
  width: "32px",
  height: "32px",
});
export const CustomButton = styled(Button)({
  display: "block",
  marginTop: "51px",
  backgroundColor: "#1D8D94",
  width: "560px",
  height: "60px",
  marginLeft: "auto",
  marginRight: "auto",
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

export const BoxTimer = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  // justifyContent: "center",
  flexDirection: "column",
  width: "171px",
  height: "171px",
  borderRadius: "50%",
  backgroundColor: " #2A3342",
  border: "1px solid rgba(65, 78, 99, 1)",
});

export const TimerGradient = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
  "& svg": {
    width: "100%",
    height: "100%",
    display: "block",
  },
});

export const TimerPoint = styled(Box)({
  position: "absolute",
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: "#40A578",
  zIndex: 2,
  // تنظیم دقیق روی کمان (مثلاً پایین سمت راست)
  top: "calc(50% - 38px)", // 50% - 38px (بالا)
  left: "calc(50% + 76px)",
  transform: "translate(60px, -60px)", // با توجه به موقعیت دلخواه روی دایره
  boxShadow: `
    0 0 6px rgba(64, 165, 120, 1),
    0 0 12px rgba(64, 165, 120, 0.7)
  `,
});

export const TimerContent = styled(Box)({
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const BoxQr = styled(Box)({
  display: "flex",
  gap: "58px",
  marginTop: "60px",
});

export const BoxQrDetail = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "38px",
});
export const PicQr = styled("div")({
  // backgroundColor: "#ABABAB",
  width: "191px",
  height: "191px",
});
export const TypographySuccess = styled(Typography)({
  fontSize: "32px",
  fontWeight: 700,
  color: "#40A578",
});

export const TextFieldSuccess = styled(TextField)({
  backgroundColor: "#242C39",
  borderRadius: "10px",
  height: "57px",
  width: "791px",
  marginTop: "22px",
  marginLeft: "39px",

  "& .MuiOutlinedInput-root": {
    paddingRight: 0,
    paddingLeft: 0,
    height: "57px",
    borderRadius: "10px",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: 700,
    letterSpacing: "0.25em",
  },

  "& input": {
    textAlign: "left",
    paddingLeft: "20px",
    color: "#FFFFFF",
  },
  "& input::placeholder": {
    color: "#FFFFFF",
    opacity: 1,
    letterSpacing: "0.25em",
  },
});

export const ButtonFailed = styled(Button)({
  display: "block",
  backgroundColor: "#1D8D94",
  width: "173px",
  height: "68px",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: "10px",
  fontSize: "20px",
  fontWeight: 700,
  color: "#FFFFFF",
  textTransform: "none",
  boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
  // "&:hover": {
  //   backgroundColor: "#16666c",
  // },
});

export const TextFieldReceive = styled(TextField)({
  backgroundColor: "#242C39",
  borderRadius: "10px",
  height: "57px",
  width: "983px",
  marginTop: "12px",
  marginLeft: "0",

  "& .MuiOutlinedInput-root": {
    paddingRight: 0,
    paddingLeft: 0,
    height: "57px",
    borderRadius: "10px",
    color: "#FFFFFF",
    fontSize: "14",
    fontWeight: 700,
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

export const ButtonRecieve = styled(Button)({
  display: "block",
  backgroundColor: "#1D8D94",
  width: "560px",
  height: "60",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: "10px",
  marginTop: "42px",
  fontSize: "16px",
  fontWeight: 700,
  color: "#FFFFFF",
  textTransform: "none",
  boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
});

export const TypographyWaiting = styled(Typography)({
  fontSize: "32px",
  fontWeight: 700,
  color: "#FFAF00",
});
// components/styled/HompageStylee.tsx

// کانتینر برای دکمه‌ها
export const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  marginTop: "32px",
  paddingBottom: "20px",
});

// دکمه Success
export const ButtonSuccess = styled(Button)({
  minWidth: "120px",
  height: "40px",
  backgroundColor: "#40A578",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 700,
  borderRadius: "8px",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: "#359768",
  },
});

// دکمه Failed
export const ButtonFailedpm = styled(Button)({
  minWidth: "120px",
  height: "40px",
  backgroundColor: "#FF4757",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 700,
  borderRadius: "8px",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: "#FF3742",
  },
});

export const CardContact = styled(Container)({
  width: "560px",
  marginX: "auto",
  marginTop: "70px",
  marginBottom: "46px",
  height: "691px",
  backgroundColor: "#2A3342",
  borderRadius: "30px",
  borderColor: "#596B89",
  display: "flex",
  flexDirection: "column",
  padding: 0,
});

export const TypographyContact = styled(Typography)({
  fontSize: "32px",
  fontWeight: 700,
  marginTop: "23px",
  marginLeft: "38px",
  background: " linear-gradient(90deg, #40A578 0%, #99D9A6 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "block", // تغییر این خط
  padding: 0,
});
export const TypographyContactDetail = styled(Typography)({
  fontWeight: 700,
  display: "block",
  padding: 0,
  lineHeight: "49px",
  fontSize: "16px",
  marginLeft: "38px",
  color: "#ABABAB",
});

export const TextFieldContact = styled(TextField)({
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
    fontWeight: 700,
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

export const TextAreaContact = styled(TextareaAutosize)({
  width: "485px",
  height: "149px", // ارتفاع ثابت
  marginTop: "15px",
  marginLeft: "39px",
  padding: "16px 20px", // padding همه طرفه مثل TextField
  borderRadius: "10px",
  backgroundColor: "#242C39",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 700,
  boxSizing: "border-box", // padding داخل اندازه محاسبه شود
  resize: "none", // کاربر نمی‌تواند اندازه تغییر دهد
  border: "none", // بدون border
  outline: "none", // بدون خط فوکوس پیش‌فرض

  "&::placeholder": {
    color: "#FFFFFF",
    opacity: 1,
  },

  "&:focus": {
    outline: "none", // هنگام فوکوس خط دور نیفتد
  },
});

export const ButtonContact = styled(Button)({
  display: "block",
  backgroundColor: "#1D8D94",
  width: "485px",
  height: "60",
  marginLeft: "38px",
  borderRadius: "10px",
  marginTop: "23px",
  fontSize: "16px",
  fontWeight: 700,
  color: "#FFFFFF",
  textTransform: "none",
  boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
});

export const CardAbout = styled(Container)({
  position: "relative",
  width: "1140px",
  marginX: "auto",
  marginTop: "78px",
  height: "485px",
  backgroundColor: "#2A3342",
  borderRadius: "30px",
  display: "flex",
  padding: 0,
});

export const BoxAbout = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "580px",
});
export const TypographyAbout = styled(Typography)({
  fontSize: "48px",
  fontWeight: 700,
  marginTop: "33px",
  marginLeft: "55px",
  marginRight: "27px",
  background: "linear-gradient(111.42deg, #40A578 5.33%, #99D9A6 47.9%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "block",
  padding: 0,
});
export const TypographyAboutText = styled(Typography)({
  fontSize: "18px",
  fontWeight: 700,
  marginTop: "26px",
  marginLeft: "55px",
  marginRight: "39px",
  color: "#ABABAB",
  display: "block",
  padding: 0,
});
export const CircleAbout = styled(Box)({
  position: "absolute",
  top: "20px",
  left: "580px",
  width: "535px",
  height: "535px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#242C39",
});

export const BoxContainer = styled(Box)({
  display: "block",
  margin: 0,
  padding: 0,
  marginBottom: "422px",
});

export const CardAboutDetail = styled(Box)({
  position: "absolute",
  width: "657px",
  marginX: "auto",
  marginTop: "80px",
  height: "318px",
  backgroundColor: "#242C39",
  border: " 1px solid #2E3E59",
  borderRadius: "30px",
  display: "flex",
  flexDirection: "column",
  padding: 0,
});
export const TypographyTitle = styled(Typography)({
  fontSize: "32px",
  fontWeight: 700,
  marginTop: "28px",
  marginLeft: "49px",
  color: "#FFFFFF",
  display: "block",
  padding: 0,
  lineHeight: "96px",
});
export const Typographysub = styled(Typography)({
  width: "560px",
  height: "95px",
  fontSize: "18px",
  fontWeight: 700,
  marginLeft: "49px",
  color: "#ABABABAB",
  display: "block",
  padding: 0,
  lineHeight: "42px",
});

export const CardFaq = styled(Box)({
  width: "1140px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "78px",
  height: "402px",
  backgroundColor: "#2A3342",
  borderRadius: "30px",
  display: "flex",
  flexDirection: "column",
  padding: 0,
});

export const TypographyFaq = styled(Typography)({
  fontSize: "48px",
  fontWeight: 700,
  lineHeight: "77px",
  marginTop: "59px",
  marginLeft: "440px",
  marginRight: "440px",
  background: "linear-gradient(111.42deg, #40A578 5.33%, #99D9A6 47.9%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "block",
  padding: 0,
});
export const BoxSearchFaq = styled(Box)({
  position: "relative",

  display: "flex",
  marginTop: "39px",
  marginLeft: "96px",
  marginRight: "97px",
});
export const TextFieldFaq = styled(TextField)({
  backgroundColor: "#242C39",
  borderRadius: "10px",
  width: "754px",

  "& .MuiOutlinedInput-root": {
    height: "80px",
    borderRadius: "10px",
  },

  "& .MuiOutlinedInput-input": {
    padding: "0 40px",
    height: "100%",
    boxSizing: "border-box",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: 700,
  },

  // استایل placeholder
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#FFFFFF",
    opacity: 1,
    // اضافه کردن پدینگ یا مارجین به placeholder
    // این بخش ممکن است در همه مرورگرها کار نکند
    paddingLeft: "53px",
  },

  // روش جایگزین برای استایل placeholder
  "& .MuiInputLabel-root": {
    color: "#FFFFFF",
  },
});
export const ButtonFaq = styled(Button)({
  display: "block",
  backgroundColor: "#1D8D94",
  width: "173px",
  height: "80px",
  marginLeft: "20px",
  borderRadius: "10px",
  marginTop: "0px",
  fontSize: "14px",
  fontWeight: 700,
  color: "#FFFFFF",
  textTransform: "none",
  boxShadow: " 0px 4px 20px 0px rgba(29, 141, 148, 0.3)",
});

export const BoxButtonFaq = styled(Box)({
  display: "flex",
  marginTop: "26px",
  marginLeft: "96px",
  marginRight: "97px",
  gap: "19px",
});
export const ButtonFaqInfo = styled(Button)({
  display: "block",
  backgroundColor: "#2A3342",
  width: "174px",
  height: "57px",
  borderRadius: "8px",
  marginTop: "0px",
  fontSize: "16px",
  fontWeight: 700,
  color: " #596B89",
  textTransform: "none",
  border: " 1px solid rgba(89, 107, 137, 1)",
});

export const CardFaqCollapse = styled(Box)({
  width: "1140px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "54px",
  height: "242px",
  backgroundColor: "#242C39",
  border: " 1px solid #2E3E59",
  borderRadius: "30px",
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  padding: 0,
});

export const CardFlexFaq = styled(Box)({
  marginLeft: "41px",
  display: "flex",

  padding: 0,
  marginTop:"36px"
});
export const TypographyFaqCollapse = styled(Typography)({
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "100%",
  marginLeft: "12px",
  color: "#FFFFFF",
  padding: 0,
});
export const TypographyFaqCollapseSub = styled(Typography)({
  width:"1035px",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "32px",
  marginLeft: "77px",
  color: "#ABABAB",
  marginTop:"29px",
  padding: 0,
});