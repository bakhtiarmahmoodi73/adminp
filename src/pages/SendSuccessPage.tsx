import React from "react";
import {
  BoxConfirmDetail,
  BoxConfirmRoot,
  BoxDetail,
  ContainerConfirm,
  TextFieldSuccess,
  TypographyConfirm,
  TypographyDetail,
  TypographySuccess,
} from "../components/styled/HompageStylee";
import { useAppSelector } from "../store/hooks/redux";
import { RootState } from "../store";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";
import Tik from "../assets/images/success/Frame (11).svg?react";

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
        height: "864px",
      }}
    >
      <BoxConfirmRoot>
        <BoxConfirmDetail>
          <TypographyConfirm sx={{ marginLeft: "0" }}>
            Transaction Details :
          </TypographyConfirm>
        </BoxConfirmDetail>
        <BoxConfirmDetail sx={{ marginTop: "81px" }}>
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
        <BoxDetail
          sx={{
            marginTop: "68px",
            marginX: "auto",
            justifyContent: "normal",
            gap: "21.12px",
          }}
        >
          <Tik />
          <TypographySuccess>Payment Success !</TypographySuccess>
        </BoxDetail>
        <TypographyDetail sx={{ marginTop: "28px", fontSize: "19.5px" }}>
          The Transaction Was Successfully Completed And The Amount Of 100
          Tether Was Deposited To This Address
        </TypographyDetail>
        <BoxDetail
          sx={{
            marginTop: "30px",
            alignItems: "center",
            gap:"79px"
          }}
        >
          <TypographyDetail sx={{fontSize:'20px'}}>E- voucher :</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0,marginLeft:0 }} placeholder="2326564925" />
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <TypographyDetail>activation code :</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0,marginLeft:0 }} placeholder="9012037427092330" />
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <TypographyDetail>Amount :</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0,marginLeft:0 }} placeholder="100 USDT" />
        </BoxDetail>
          <BoxDetail
          sx={{
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <TypographyDetail>Time & Date :</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0,marginLeft:0,letterSpacing:"25%" }} placeholder="25-02-2023, 13:22:16" />
        </BoxDetail>
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
}

export default SendSuccessPage;
