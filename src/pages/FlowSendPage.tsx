import { useState, useEffect, useCallback } from "react"; // useRef اضافه شد
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks/redux";
import { RootState } from "../store";
import {
  BoxConfirmDetail,
  BoxConfirmRoot,
  BoxDetail,
  ContainerConfirm,
  TypographyDetail,
  TypographyConfirm,
  BoxCircle,
  TypographyRule,
} from "../components/styled/HompageStylee";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import { Box, Button } from "@mui/material";
import Line from "../assets/images/lines/Line 10.svg?react";
import QRCodeGenerator from "../components/QRCodeGenerator";
import FigmaTimer from "../components/Timer/Timer";

function FlowSendPage() {
  const navigate = useNavigate();
  const exchangeState = useAppSelector((state: RootState) => state.exchange);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const [displayData, setDisplayData] = useState({
    fromAmount: "",
    fromCurrency: "tether",
    toAmount: "",
    toCurrency: "permoney"
  });
  const saveDataToLocalStorage = useCallback((dataToSave?: any) => {
    const data = dataToSave || {
      fromAmount: exchangeState.fromAmount || displayData.fromAmount,
      fromCurrency: exchangeState.fromCurrency || displayData.fromCurrency,
      toAmount: exchangeState.toAmount || displayData.toAmount,
      toCurrency: exchangeState.toCurrency || displayData.toCurrency,
      timestamp: new Date().getTime(),
      page: 'flow-send'
    };
        if (!data.fromAmount || data.fromAmount === "") return;

    const storageKeys = [
      'flowSendPageData',
      'exchangeFlowData',
      'exchangeData'
    ];
    
    storageKeys.forEach(key => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error(`Error saving to ${key}:`, error);
      }
    });
    
    console.log('💾 Data saved safely');
    return data;
  }, [exchangeState, displayData]);

  const loadFromLocalStorage = useCallback(() => {
    const priorityKeys = ['flowSendPageData', 'exchangeFlowData', 'exchangeData'];
    for (const key of priorityKeys) {
      try {
        const dataStr = localStorage.getItem(key);
        if (dataStr) {
          const data = JSON.parse(dataStr);
          if (data.fromAmount) return data;
        }
      } catch (e) { console.error(e); }
    }
    return null;
  }, []);

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    
    if (savedData) {
      setDisplayData({
        fromAmount: savedData.fromAmount,
        fromCurrency: savedData.fromCurrency,
        toAmount: savedData.toAmount,
        toCurrency: savedData.toCurrency
      });
    } else if (exchangeState.fromAmount) {
      const initialData = {
        fromAmount: exchangeState.fromAmount,
        fromCurrency: exchangeState.fromCurrency,
        toAmount: exchangeState.toAmount,
        toCurrency: exchangeState.toCurrency
      };
      setDisplayData(initialData);
      saveDataToLocalStorage(initialData);
    }
    
    setIsHydrated(true);

    const handleBeforeUnload = () => {
      saveDataToLocalStorage();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (isHydrated && exchangeState.fromAmount && exchangeState.fromAmount !== "") {
      const newData = {
        fromAmount: exchangeState.fromAmount,
        fromCurrency: exchangeState.fromCurrency,
        toAmount: exchangeState.toAmount,
        toCurrency: exchangeState.toCurrency,
        timestamp: new Date().getTime(),
        page: 'flow-send'
      };
      setDisplayData(newData);
      saveDataToLocalStorage(newData);
    }
  }, [exchangeState.fromAmount, exchangeState.toAmount, isHydrated]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  const handleSuccess = () => {
    const transactionData = saveDataToLocalStorage();
    navigate("/success", { state: { transactionData } });
  };
  const handleFailed = () => {
    const transactionData = saveDataToLocalStorage();
    navigate("/failed", { state: { transactionData } });
  };
  const getSendIcon = () => displayData.fromCurrency === "tether" ? <Tether /> : <PerMoney />;
  const getSendCurrencyText = () => displayData.fromCurrency === "tether" ? "USDT" : "Perfect Money";
  const getReceiveIcon = () => displayData.toCurrency === "tether" ? <Tether /> : <PerMoney />;
  const getReceiveCurrencyText = () => displayData.toCurrency === "tether" ? "USDT" : "Perfect Money";
  if (!isHydrated) {
    return (
      <ContainerConfirm sx={{ height: "auto", pb: 4 }}>
        <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          Loading transaction data...
        </div>
      </ContainerConfirm>
    );
  }

  return (
    <ContainerConfirm sx={{ height: "auto", pb: 4 }}>
      <BoxConfirmRoot>
        <BoxConfirmDetail>
          <TypographyConfirm sx={{ marginLeft: "0" }}>
            Transaction Details :
          </TypographyConfirm>
          <FigmaTimer />
        </BoxConfirmDetail>
        <BoxConfirmDetail sx={{ marginTop: "54px" }}>
          <TypographyDetail>Send :</TypographyDetail>
          <BoxDetail>
            <TypographyDetail sx={{ color: "#FFFFFF" }}>
              {displayData.fromAmount || "0"}
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
              {displayData.toAmount || "0"}
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
              Any Change In Exchange Rate On The Binance Exchange Gives Us The Right To Recalculate...
            </TypographyRule>
          </BoxDetail>
          <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
            <BoxCircle>2</BoxCircle>
            <TypographyRule>
              The Rate For Your Application Will Be Fixed After 1 Confirmation Online.
            </TypographyRule>
          </BoxDetail>
          <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
            <BoxCircle>3</BoxCircle>
            <TypographyRule>
              Funds Are Credited After 20 Transaction Confirmations.
            </TypographyRule>
          </BoxDetail>
        </BoxConfirmRoot>

        <Box sx={{ display: "flex", gap: "20px", justifyContent: "center", mt: "40px", flexWrap: "wrap" }}>
          <Button variant="contained" onClick={handleSuccess} sx={{ backgroundColor: "#1D8D94", color: "#FFFFFF", borderRadius: "10px", padding: "12px 40px", fontWeight: 700, textTransform: "none", minWidth: "180px" }}>
            Success
          </Button>
          <Button variant="contained" onClick={handleFailed} sx={{ backgroundColor: "#DC2626", color: "#FFFFFF", borderRadius: "10px", padding: "12px 40px", fontWeight: 700, textTransform: "none", minWidth: "180px" }}>
            Failed
          </Button>
        </Box>
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
}

export default FlowSendPage;