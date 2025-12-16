// pages/FlowReceivePage.tsx

import { useNavigate } from "react-router-dom"; // ایمپورت useNavigate
import { useAppSelector } from "../store/hooks/redux";
import { RootState } from "../store";
import {
  BoxConfirmDetail,
  BoxConfirmRoot,
  BoxDetail,
  ContainerConfirm,
  TypographyDetail,
  TypographyConfirm,
  TypographyWaiting,
  TextFieldSuccess,
  ButtonSuccess, // اضافه کردن دکمه Success
  ButtonFailedpm,  // اضافه کردن دکمه Failed
  ButtonContainer // اضافه کردن کانتینر برای دکمه‌ها
} from "../components/styled/HompageStylee";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";
import Witing from "../assets/images/waiting/Frame (13).svg?react";

const WaitingPage: React.FC = () => {
  const navigate = useNavigate(); // ایجاد متغیر navigate
  
  const exchangeState = useAppSelector((state: RootState) => state.exchange);

  // تابع برای هدایت به صفحه Success
  const handleSuccessClick = () => {
    navigate("/pmsuccess");
  };

  // تابع برای هدایت به صفحه Failed
  const handleFailedClick = () => {
    navigate("/pmfailed");
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

  return (
    <ContainerConfirm sx={{ height: "667px" }}>
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

        <BoxDetail
          sx={{
            marginTop: "28px",
            marginX: "auto",
            justifyContent: "normal",
            gap: "7px",
          }}
        >
          <Witing style={{ marginTop: "8px" }} />
          <TypographyWaiting>waiting ...</TypographyWaiting>
        </BoxDetail>
        <TypographyDetail sx={{ textAlign: "center", marginTop: "24px" }}>
          Your Payment Was Successful And We Will Soon Pay The Amount Of 100
          Tether To This Address :
        </TypographyDetail>
        <BoxDetail
          sx={{
            marginTop: "53px",
            alignItems: "center",
          }}
        >
          <TypographyDetail> Address:</TypographyDetail>
          <TextFieldSuccess
            sx={{ marginTop: 0, marginLeft: 0 }}
            placeholder="X09aa998ee454c456255daf3ac94908f1dcfb7033"
          />
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "19px",
            alignItems: "center",
          }}
        >
          <TypographyDetail> Amount :</TypographyDetail>
          <TextFieldSuccess
            sx={{ marginTop: 0, marginLeft: 0 }}
            placeholder="100 USDT"
          />
        </BoxDetail>

        {/* اضافه کردن دکمه‌های Success و Failed */}
        <ButtonContainer>
          <ButtonSuccess onClick={handleSuccessClick}>
            SUCCESS
          </ButtonSuccess>
          <ButtonFailedpm onClick={handleFailedClick}>
            Failed
          </ButtonFailedpm>
        </ButtonContainer>
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
};

export default WaitingPage;