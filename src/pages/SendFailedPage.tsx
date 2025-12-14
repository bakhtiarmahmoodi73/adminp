import React from "react";
import {
  BoxConfirmDetail,
  BoxConfirmRoot,
  BoxDetail,
  ContainerConfirm,
  TypographyConfirm,
  TypographyDetail,
} from "../components/styled/HompageStylee";
import { useAppSelector } from "../store/hooks/redux";
import { RootState } from "../store";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";

function SendSuccessPage() {
  const exchangeState = useAppSelector((state: RootState) => state.exchange);

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

  // این تابع stepper را به مرحله complete برمی‌گرداند
  const setStepperToComplete = () => {
    // اگر stepper state global دارید، آن را update کنید
    // یا از context/Redux استفاده کنید
    localStorage.setItem("stepperStatus", "complete");
  };

  // هنگام لود صفحه، stepper را تنظیم کن
  React.useEffect(() => {
    setStepperToComplete();
  }, []);

  return (
    <ContainerConfirm
      sx={{
        height: "684px",
      }}
    >
      <BoxConfirmRoot>
        <BoxConfirmDetail>
          <TypographyConfirm sx={{ marginLeft: "0" }}>
            Transaction Details :
          </TypographyConfirm>
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
        
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
}

export default SendSuccessPage;
