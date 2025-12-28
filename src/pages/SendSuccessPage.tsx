import  { useState, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

function SendSuccessPage() {
  const exchangeState = useAppSelector((state: RootState) => state.exchange);
  const location = useLocation();
  const navigate = useNavigate();
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState({
    fromAmount: "100",
    fromCurrency: "tether",
    toAmount: "120",
    toCurrency: "permoney"
  });

  const saveDataFromLocationState = () => {
    if (location.state) {
      const possibleDataKeys = ['exchangeData', 'transactionData', 'data'];
      for (const key of possibleDataKeys) {
        if (location.state[key]) {
          const data = location.state[key];
          const dataToSave = {
            fromAmount: data.fromAmount || "100",
            fromCurrency: data.fromCurrency || "tether",
            toAmount: data.toAmount || "120",
            toCurrency: data.toCurrency || "permoney",
            timestamp: new Date().getTime(),
            savedFrom: `location-state-${key}`
          };
          localStorage.setItem('exchangeData', JSON.stringify(dataToSave));
          localStorage.setItem('lastSuccessfulExchange', JSON.stringify(dataToSave));
          localStorage.setItem('successPageData', JSON.stringify(dataToSave));
          localStorage.setItem('currentSuccessTransaction', JSON.stringify(dataToSave));
          
          setDisplayData(dataToSave);
          console.log('💾 Data saved from location state:', dataToSave);
          return true;
        }
      }
    }
    return false;
  };
  const loadFromLocalStorage = () => {
    console.log('🔄 SendSuccessPage: Loading from localStorage...');
        const priorityKeys = [
      'currentSuccessTransaction', 
      'lastSuccessfulExchange',    
      'successPageData',           
      'exchangeData',              
      'lastExchangeData',          
      'exchangeFlowData',         
      'backupExchangeData'       
    ];
    
    let latestData = null;
    let latestTimestamp = 0;
    
    for (const key of priorityKeys) {
      try {
        const dataStr = localStorage.getItem(key);
        if (dataStr) {
          const data = JSON.parse(dataStr);
          if (data.fromAmount && data.timestamp) {
            const isRecent = new Date().getTime() - data.timestamp < 60 * 60 * 1000;
            if (isRecent && data.timestamp > latestTimestamp) {
              latestTimestamp = data.timestamp;
              latestData = data;
              console.log(`📦 Found recent data in ${key}:`, data);
            }
          }
        }
      } catch (error) {
        console.error(` Error reading ${key}:`, error);
      }
    }
    
    if (latestData) {
      setDisplayData({
        fromAmount: latestData.fromAmount || "100",
        fromCurrency: latestData.fromCurrency || "tether",
        toAmount: latestData.toAmount || "120",
        toCurrency: latestData.toCurrency || "permoney"
      });
      return true;
    }
        if (exchangeState.fromAmount && exchangeState.toAmount) {
      console.log('📊 Using data from Redux:', exchangeState);
      const dataToSave = {
        fromAmount: exchangeState.fromAmount,
        fromCurrency: exchangeState.fromCurrency || "tether",
        toAmount: exchangeState.toAmount,
        toCurrency: exchangeState.toCurrency || "permoney",
        timestamp: new Date().getTime(),
        savedFrom: 'redux-fallback'
      };
      
      localStorage.setItem('currentSuccessTransaction', JSON.stringify(dataToSave));
      setDisplayData(dataToSave);
      return true;
    }
    
    return false;
  };

  useEffect(() => {
        const locationDataLoaded = saveDataFromLocationState();
        if (!locationDataLoaded) {
      const storageDataLoaded = loadFromLocalStorage();
            if (!storageDataLoaded && !location.state && Object.keys(exchangeState).length === 0) {
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    }
    
    setIsHydrated(true);
    localStorage.setItem("stepperStatus", "complete");
        const handleBeforeUnload = () => {
      localStorage.setItem('lastSuccessfulExchange', JSON.stringify({
        ...displayData,
        timestamp: new Date().getTime(),
        savedAt: new Date().toISOString()
      }));
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [exchangeState, location.state]);

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
      <ContainerConfirm sx={{ height: "864px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TypographySuccess>Loading transaction data...</TypographySuccess>
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
              {displayData.fromAmount}
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
              {displayData.toAmount}
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
          The Transaction Was Successfully Completed And The Amount Of {displayData.fromAmount} {getSendCurrencyText()} Was Deposited
        </TypographyDetail>
        <BoxDetail
          sx={{
            marginTop: "30px",
            alignItems: "center",
            gap: "79px"
          }}
        >
          <TypographyDetail sx={{ fontSize: '20px' }}>E- voucher :</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0, marginLeft: 0 }} disabled  placeholder="2326564925" />
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <TypographyDetail>activation code :</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0, marginLeft: 0 }} disabled placeholder="9012037427092330" />
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <TypographyDetail>Amount :</TypographyDetail>
          <TextFieldSuccess 
            sx={{ marginTop: 0, marginLeft: 0 }} disabled 
            placeholder={`${displayData.fromAmount} ${getSendCurrencyText()}`} 
          />
        </BoxDetail>
        <BoxDetail
          sx={{
            marginTop: "18px",
            alignItems: "center",
          }}
        >
          <TypographyDetail>Time & Date :</TypographyDetail>
          <TextFieldSuccess sx={{ marginTop: 0, marginLeft: 0, letterSpacing: "25%" }} 
            disabled placeholder={`${new Date().toLocaleDateString('en-GB')}, ${new Date().toLocaleTimeString('en-US', {hour12: false})}`} 
          />
        </BoxDetail>
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
}

export default SendSuccessPage;