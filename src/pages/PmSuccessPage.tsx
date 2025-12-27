import  { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";
import Tik from "../assets/images/success/Frame (11).svg?react";

function PmSuccessPage() {
  const location = useLocation();
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState({
    fromAmount: "100",
    fromCurrency: "tether",
    toAmount: "120",
    toCurrency: "permoney"
  });

  const loadFromLocalStorage = () => {
    try {
      if (location.state?.transactionData) {
        
        const transactionData = location.state.transactionData;
        setDisplayData({
          fromAmount: transactionData.fromAmount || "100",
          fromCurrency: transactionData.fromCurrency || "tether",
          toAmount: transactionData.toAmount || "120",
          toCurrency: transactionData.toCurrency || "permoney"
        });
        return true;
      }
      
      const savedData = localStorage.getItem('lastExchangeData');
      console.log('🔍 Checking localStorage for lastExchangeData');
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        if (parsedData.fromAmount) {
          setDisplayData({
            fromAmount: parsedData.fromAmount || "100",
            fromCurrency: parsedData.fromCurrency || "tether",
            toAmount: parsedData.toAmount || "120",
            toCurrency: parsedData.toCurrency || "permoney"
          });
          return true;
        }
      }
      
      const backupKeys = ['exchangeData', 'exchangeWaitingData', 'currentTransaction'];
      
      for (const key of backupKeys) {
        const backupData = localStorage.getItem(key);
        if (backupData) {
          const parsedData = JSON.parse(backupData);
          if (parsedData.fromAmount) {
            console.log(`🔁 Loading from backup key ${key}:`, parsedData);
            setDisplayData({
              fromAmount: parsedData.fromAmount || "100",
              fromCurrency: parsedData.fromCurrency || "tether",
              toAmount: parsedData.toAmount || "120",
              toCurrency: parsedData.toCurrency || "permoney"
            });
            return true;
          }
        }
      }
    } catch (error) {
      console.error('❌ Error loading from localStorage:', error);
    }
    return false;
  };

  useEffect(() => {
    console.log('🚀 PmSuccessPage mounted');
    console.log('📍 Location state:', location.state);
    
    const dataLoaded = loadFromLocalStorage();
    
    if (!dataLoaded) {
      console.log('⚠️ Using default data in PmSuccessPage');
    }
    
    setIsHydrated(true);
    
    localStorage.setItem("stepperStatus", "complete");
  }, [location.state]);

  const getSendIcon = () => {
    if (displayData.fromCurrency === "tether") {
      return <Tether />;
    } else {
      return <PerMoney />;
    }
  };

  const getSendCurrencyText = () => {
    if (displayData.fromCurrency === "tether") {
      return "USDT";
    } else {
      return "Perfect Money";
    }
  };

  const getReceiveIcon = () => {
    if (displayData.toCurrency === "tether") {
      return <Tether />;
    } else {
      return <PerMoney />;
    }
  };

  const getReceiveCurrencyText = () => {
    if (displayData.toCurrency === "tether") {
      return "USDT";
    } else {
      return "Perfect Money";
    }
  };

  if (!isHydrated) {
    return (
      <ContainerConfirm sx={{ height: "864px" }}>
        <div>Loading transaction data...</div>
      </ContainerConfirm>
    );
  }

  return (
    <ContainerConfirm sx={{ height: "864px" }}>
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
              {displayData.fromAmount || "100"}
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
              {displayData.toAmount || "120"}
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
          The Transaction Was Successfully Completed And The Amount Of {displayData.fromAmount || "100"} {getSendCurrencyText()} Was Deposited
        </TypographyDetail>
        <BoxDetail
          sx={{
            marginTop: "30px",
            alignItems: "center",
            gap: "79px"
          }}
        >
          <TypographyDetail sx={{fontSize:'20px'}}>Address:</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0, marginLeft: 0 , }} placeholder="X09aa998ee454c456255daf3ac94908f1dcfb7033" />
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <TypographyDetail>Amount :</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0, marginLeft: 0 }} placeholder="100 USDT" />
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <TypographyDetail>Time & Date :</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0, marginLeft: 0 }} placeholder="25-02-2023, 13:22:16" />
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <TypographyDetail>Tx Id :</TypographyDetail>
     <TextFieldSuccess
  multiline
  rows={3}
  placeholder="f9798ecf9e9cc54dd819c8e1dc36588a6a7fe9d8e055d56ef6a9847139a4ed6c"
  sx={{
    marginTop: 0,
    marginLeft: 0,
    width: "791px", 
    "& .MuiInputBase-root": {
      height: "112px",
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "36px",
      letterSpacing: "0.25em",
      alignItems: "flex-start",
      padding: "16px", 
    },
    "& .MuiInputBase-input": {
      maxWidth: "628px", 
      lineHeight: "36px",
      wordBreak: "break-all",
    },
    "& .MuiInputBase-input::placeholder": {
      lineHeight: "36px",
      opacity: 1,
      wordBreak: "break-all",
      whiteSpace: "pre-wrap",
      maxWidth: "628px",
    },
  }}
/>
        </BoxDetail>
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
}

export default PmSuccessPage;