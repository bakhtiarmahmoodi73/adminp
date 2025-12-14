// pages/FlowSendPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // اضافه کردن useNavigate
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
  BoxCircle,
  TypographyRule,
} from "../components/styled/HompageStylee";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import TimperGradient from "../assets/images/tether/Ellipse 14.svg?react";
import TimerPoint from "../assets/images/tether/Ellipse 15.svg?react";
import { Box, Button } from "@mui/material"; // اضافه کردن Button
import Watch from "../assets/images/tether/Frame (5).svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";
import QRCodeGenerator from "../components/QRCodeGenerator";

function FlowSendPage() {
  const navigate = useNavigate(); // hook برای navigation
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



  
  // تابع برای هدایت به صفحه success
  const handleSuccess = () => {
    navigate("/success"); // مسیر صفحه success
  };

  // تابع برای هدایت به صفحه failed
  const handleFailed = () => {
    navigate("/failed"); // مسیر صفحه failed
  };

  return (
    <ContainerConfirm sx={{ height: "auto", pb: 4 }}> {/* ارتفاع auto و padding پایین */}
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
        <QRCodeGenerator />
        <TypographyConfirm sx={{ mt: "54px", marginLeft: 0 }}>
          Exchange Conditions:
        </TypographyConfirm>

        <BoxConfirmRoot sx={{ mt: "31px", gap: "12px", marginLeft: 0 }}>
          <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
            <BoxCircle>1</BoxCircle>
            <TypographyRule>
              Any Change In Exchange Rate On The Binance Exchange Gives Us The
              Right To Recalculate The Amount Of The Application.
            </TypographyRule>
          </BoxDetail>

          <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
            <BoxCircle>2</BoxCircle>
            <TypographyRule>
              The Rate For Your Application Will Be Fixed After 1 Confirmation
              Online.{" "}
            </TypographyRule>
          </BoxDetail>

          <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
            <BoxCircle>3</BoxCircle>
            <TypographyRule>
              Funds Are Credited After 20 Transaction Confirmations.{" "}
            </TypographyRule>
          </BoxDetail>
        </BoxConfirmRoot>

        {/* دو دکمه Success و Failed */}
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            mt: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* دکمه Success */}
          <Button
            variant="contained"
            onClick={handleSuccess}
            sx={{
              backgroundColor: "#1D8D94",
              color: "#FFFFFF",
              borderRadius: "10px",
              padding: "12px 40px",
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0px 0px 20px 0px #1D8D9480",
              "&:hover": {
                backgroundColor: "#16666c",
              },
              minWidth: "180px",
            }}
          >
            Success
          </Button>

          {/* دکمه Failed */}
          <Button
            variant="contained"
            onClick={handleFailed}
            sx={{
              backgroundColor: "#DC2626", // قرمز
              color: "#FFFFFF",
              borderRadius: "10px",
              padding: "12px 40px",
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0px 0px 20px 0px rgba(220, 38, 38, 0.5)",
              "&:hover": {
                backgroundColor: "#B91C1C",
              },
              minWidth: "180px",
            }}
          >
            Failed
          </Button>
        </Box>
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
}

export default FlowSendPage;