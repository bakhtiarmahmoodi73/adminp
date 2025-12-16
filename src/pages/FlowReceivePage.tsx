// pages/FlowReceivePage.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // خط 1: ایمپورت useNavigate
import { useAppSelector } from "../store/hooks/redux";
import { RootState } from "../store";
import {
  BoxConfirmDetail,
  BoxConfirmRoot,
  BoxDetail,
  ContainerConfirm,
  TypographyDetail,
  TypographyConfirm,
  BoxTimer,
  TimerContent,
  TextFieldReceive,
  ButtonRecieve,
} from "../components/styled/HompageStylee";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import TimperGradient from "../assets/images/tether/Ellipse 14.svg?react";
import TimerPoint from "../assets/images/tether/Ellipse 15.svg?react";
import Watch from "../assets/images/tether/Frame (5).svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";
import { TextField, Paper, Box } from "@mui/material";
import Arrow from "../assets/images/arrow/Frame (6).svg?react";

const FlowReceivePage: React.FC = () => {
  const navigate = useNavigate(); // خط 2: ایجاد متغیر navigate
  const exchangeState = useAppSelector((state: RootState) => state.exchange);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")} : ${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getSendIcon = () => {
    if (exchangeState.fromCurrency === "tether") {
      return <Tether />;
    } else {
      return <PerMoney />;
    }
  };

  const getSendCurrencyText = () => {
    if (exchangeState.fromCurrency === "tether") {
      return "USDT";
    } else {
      return "Perfect Money";
    }
  };

  const getReceiveIcon = () => {
    if (exchangeState.toCurrency === "tether") {
      return <Tether />;
    } else {
      return <PerMoney />;
    }
  };

  const getReceiveCurrencyText = () => {
    if (exchangeState.toCurrency === "tether") {
      return "USDT";
    } else {
      return "Perfect Money";
    }
  };

  // خط 3: تابع هندل کلیک دکمه Submit
  const handleSubmit = () => {
    navigate("/waiting");
  };

  return (
    <ContainerConfirm sx={{ height: "939px" }}>
      <BoxConfirmRoot>
        <BoxConfirmDetail>
          <TypographyConfirm sx={{ marginLeft: "0" }}>
            Transaction Details :
          </TypographyConfirm>
          <BoxTimer>
            <Box
              sx={{
                position: "absolute",
                top: "-2px",
                left: "85px",
                right: "-1px",
                zIndex: 0,
              }}
            >
              <TimperGradient />
            </Box>
            <Box
              sx={{
                position: "absolute",
                left: "130px",
                top: "131px",
              }}
            >
              <TimerPoint />
            </Box>
            <TimerContent>
              <TypographyDetail
                sx={{ fontSize: "12px", marginTop: "38px", color: "#ffffff" }}
              >
                Time For Payment
              </TypographyDetail>
              <TypographyDetail
                sx={{ fontSize: "32px", color: " #40A578", marginTop: "12px" }}
              >
                {formatTime(timeLeft)}
              </TypographyDetail>

              <BoxDetail sx={{ gap: "3.67px", marginTop: "25px" }}>
                <Watch style={{ marginTop: "2px" }} />

                <TypographyDetail sx={{ fontSize: "14px", color: "#ffffff" }}>
                  15 : 30
                </TypographyDetail>
              </BoxDetail>
            </TimerContent>
          </BoxTimer>
        </BoxConfirmDetail>

        <BoxConfirmDetail sx={{ marginTop: "54px" }}>
          <TypographyDetail>Send :</TypographyDetail>
          <BoxDetail>
            <TypographyDetail sx={{ color: "#FFFFFF" }}>
              {exchangeState.fromAmount || "100"}
            </TypographyDetail>
            {getSendIcon()}
            <TypographyDetail sx={{ color: "#FFFFFF" }}>
              {getSendCurrencyText()}
            </TypographyDetail>
          </BoxDetail>
        </BoxConfirmDetail>

        <BoxConfirmDetail sx={{ mt: "16px" }}>
          <TypographyDetail>Receive :</TypographyDetail>
          <BoxDetail sx={{ gap: "9px" }}>
            <TypographyDetail sx={{ color: "#FFFFFF" }}>
              {exchangeState.toAmount || "120"}
            </TypographyDetail>
            {getReceiveIcon()}
            <TypographyDetail sx={{ color: "#FFFFFF" }}>
              {getReceiveCurrencyText()}
            </TypographyDetail>
          </BoxDetail>
        </BoxConfirmDetail>
        <Line style={{ marginTop: "34px" }} />
        <TypographyDetail sx={{ marginTop: "16px", fontSize: "16px" }}>
          {" "}
          Perfect Money Code :
        </TypographyDetail>
        <TextFieldReceive placeholder="Please Enter Perfect Money Code " />

        <TypographyDetail sx={{ marginTop: "16px", fontSize: "16px" }}>
          {" "}
          Perfect Money Number :{" "}
        </TypographyDetail>
        <TextFieldReceive placeholder="Please Enter Perfect Money Number  " />

        <TypographyDetail sx={{ marginTop: "16px", fontSize: "16px" }}>
          {" "}
          Choose Network And Enter Tether Address :{" "}
        </TypographyDetail>

        <TextField
          fullWidth
          placeholder="Please Enter Address"
          InputProps={{
            startAdornment: (
              <Paper
                elevation={0}
                sx={{
                  width: "126px",
                  height: "57px",
                  backgroundColor: "#1D8D94",
                  color: "#FFFFFF",
                  borderRadius: "10px 0 0 10px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <select
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "0 40px 0 16px",
                    background: "transparent",
                    border: "none",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    outline: "none",
                    cursor: "pointer",
                    appearance: "none",
                    fontSize: "16px",
                    borderRadius: "10px 0 0 10px",
                  }}
                >
                  <option value="TRON">TRON</option>
                </select>

                <Box
                  sx={{
                    position: "absolute",
                    right: "16px",
                    pointerEvents: "none",
                  }}
                >
                  <Arrow width={24} height={24} />
                </Box>
              </Paper>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#242C39",
              borderRadius: "10px",
              height: "57px",
              paddingLeft: 0,
              marginTop:"12px"
            },

            "& .MuiOutlinedInput-input": {
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 700,
              paddingLeft: "20px",

              "&::placeholder": {
                color: "#FFFFFF",
                opacity: 1,
              },
            },

            "& fieldset": {
              border: "none",
            },
          }}
        />
        {/* خط 4: اضافه کردن onClick به دکمه */}
        <ButtonRecieve onClick={handleSubmit}>Submit</ButtonRecieve>
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
};

export default FlowReceivePage;