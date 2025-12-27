import  { useState, useEffect } from "react";
import {
  BoxConfirmDetail,
  BoxConfirmRoot,
  BoxDetail,
  ButtonFailed,
  ContainerConfirm,
  TypographyConfirm,
  TypographyDetail,
  TypographySuccess,
} from "../components/styled/HompageStylee";
import { useAppSelector } from "../store/hooks/redux";
import { RootState } from "../store";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";
import Close from "../assets/images/CloseFailed/Frame (12).svg?react";
import { useNavigate, useLocation } from "react-router-dom"; // اضافه کردن useLocation

function SendFailedPage() {
  const exchangeState = useAppSelector((state: RootState) => state.exchange);
  const navigate = useNavigate();
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
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        if (parsedData.fromAmount) {
          console.log('🔄 SendFailedPage: Loading from localStorage:', parsedData);
          setDisplayData({
            fromAmount: parsedData.fromAmount || "100",
            fromCurrency: parsedData.fromCurrency || "tether",
            toAmount: parsedData.toAmount || "120",
            toCurrency: parsedData.toCurrency || "permoney"
          });
          return true;
        }
      }
      
      const backupKeys = ['exchangeData', 'exchangeWaitingData', 'currentTransaction', 'exchangeReceiveData', 'exchangeFlowData'];
      
      for (const key of backupKeys) {
        const backupData = localStorage.getItem(key);
        if (backupData) {
          const parsedData = JSON.parse(backupData);
          if (parsedData.fromAmount && parsedData.timestamp) {
            const isRecent = new Date().getTime() - parsedData.timestamp < 5 * 60 * 1000; // 5 دقیقه
            if (isRecent) {
              console.log(`🔁 SendFailedPage: Loading from backup key ${key}:`, parsedData);
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
      }
      
      if (exchangeState.fromAmount && exchangeState.toAmount) {
        console.log('📝 SendFailedPage: Using data from Redux:', exchangeState);
        setDisplayData({
          fromAmount: exchangeState.fromAmount,
          fromCurrency: exchangeState.fromCurrency || "tether",
          toAmount: exchangeState.toAmount,
          toCurrency: exchangeState.toCurrency || "permoney"
        });
        return true;
      }
    } catch (error) {
      console.error('❌ SendFailedPage: Error loading from localStorage:', error);
    }
    return false;
  };

  useEffect(() => {
    console.log('🚀 SendFailedPage mounted');
    console.log('📍 Location state:', location.state);
    console.log('📊 Current exchangeState:', exchangeState);
    
    const dataLoaded = loadFromLocalStorage();
    
    if (!dataLoaded) {
      console.log('⚠️ SendFailedPage: Using default data');
      // ذخیره داده‌های پیش‌فرض در localStorage
      const defaultData = {
        ...displayData,
        timestamp: new Date().getTime(),
        savedFrom: 'sendfailed-default'
      };
      localStorage.setItem('lastExchangeData', JSON.stringify(defaultData));
    }
    
    setIsHydrated(true);
    
    localStorage.setItem("stepperStatus", "complete");
    
    const saveCurrentData = () => {
      const dataToSave = {
        ...displayData,
        timestamp: new Date().getTime(),
        page: 'sendfailed',
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem('currentTransaction', JSON.stringify(dataToSave));
    };
    
    saveCurrentData();
    
    const handleBeforeUnload = () => {
      console.log('💾 SendFailedPage: Saving before unload');
      saveCurrentData();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [exchangeState, location.state]);

  const handleTryAgain = () => {
    localStorage.removeItem("stepperStatus");
    
    localStorage.removeItem('exchangeData');
    localStorage.removeItem('exchangeWaitingData');
    localStorage.removeItem('lastExchangeData');
    localStorage.removeItem('currentTransaction');
    
    navigate("/");
  };

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
      <ContainerConfirm sx={{ height: "684px" }}>
        <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          Loading transaction data...
        </div>
      </ContainerConfirm>
    );
  }

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
          <Close />
          <TypographySuccess sx={{ color: " #F66066" }}>
            Your Payment Time Has Expired !
          </TypographySuccess>
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "29px",
            marginX: "auto",
          }}
        >
          <TypographySuccess sx={{ color: "#ABABAB", fontSize: "20px" }}>
            Please Complete The Payment Process Again
          </TypographySuccess>
        </BoxDetail>

        <BoxDetail
          sx={{
            marginTop: "30px",
            marginX: "auto",
          }}
        >
          <ButtonFailed onClick={handleTryAgain}>Try Again</ButtonFailed>
        </BoxDetail>
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
}

export default SendFailedPage;