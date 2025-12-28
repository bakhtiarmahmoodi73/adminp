import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  ButtonSuccess,
  ButtonFailedpm,
  ButtonContainer
} from "../components/styled/HompageStylee";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";
import Witing from "../assets/images/waiting/Frame (13).svg?react";

const WaitingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const exchangeState = useAppSelector((state: RootState) => state.exchange);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState({
    fromAmount: "100",
    fromCurrency: "tether",
    toAmount: "120",
    toCurrency: "permoney"
  });
  const saveToLocalStorage = (data: any) => {
    try {
      const storageData = {
        ...data,
        timestamp: new Date().getTime(),
        page: 'waiting',
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('exchangeData', JSON.stringify(storageData));
      localStorage.setItem('exchangeWaitingData', JSON.stringify(storageData));
      localStorage.setItem('lastExchangeData', JSON.stringify(storageData));
      localStorage.setItem('currentTransaction', JSON.stringify(storageData));
      
    } catch (error) {
      console.error(' Error saving to localStorage:', error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const currentData = localStorage.getItem('currentTransaction');
      if (currentData) {
        const parsedData = JSON.parse(currentData);
        const isRecent = new Date().getTime() - parsedData.timestamp < 5 * 60 * 1000; // 5 دقیقه
        
        if (isRecent && parsedData.fromAmount) {
          setDisplayData({
            fromAmount: parsedData.fromAmount || "100",
            fromCurrency: parsedData.fromCurrency || "tether",
            toAmount: parsedData.toAmount || "120",
            toCurrency: parsedData.toCurrency || "permoney"
          });
          return true;
        }
      }
      const savedData = localStorage.getItem('exchangeData');
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const isRecent = new Date().getTime() - parsedData.timestamp < 5 * 60 * 1000;
        
        if (isRecent && parsedData.fromAmount) {
          setDisplayData({
            fromAmount: parsedData.fromAmount || "100",
            fromCurrency: parsedData.fromCurrency || "tether",
            toAmount: parsedData.toAmount || "120",
            toCurrency: parsedData.toCurrency || "permoney"
          });
          return true;
        }
      }
      const backupKeys = ['exchangeWaitingData', 'lastExchangeData', 'exchangeReceiveData', 'exchangeFlowData'];
      
      for (const key of backupKeys) {
        const backupData = localStorage.getItem(key);
        if (backupData) {
          const parsedData = JSON.parse(backupData);
          if (parsedData.fromAmount && parsedData.timestamp) {
            const isRecent = new Date().getTime() - parsedData.timestamp < 5 * 60 * 1000;
            if (isRecent) {
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
    } catch (error) {
      console.error(' Error loading from localStorage:', error);
    }
    return false;
  };

  useEffect(() => {
    if (location.state?.transactionData) {      
      const transactionData = location.state.transactionData;
      setDisplayData({
        fromAmount: transactionData.fromAmount || "100",
        fromCurrency: transactionData.fromCurrency || "tether",
        toAmount: transactionData.toAmount || "120",
        toCurrency: transactionData.toCurrency || "permoney"
      });
      saveToLocalStorage(transactionData);
      setIsHydrated(true);
      return;
    }
    const dataLoaded = loadFromLocalStorage();
    if (!dataLoaded && exchangeState.fromAmount && exchangeState.toAmount) {      
      const newData = {
        fromAmount: exchangeState.fromAmount,
        fromCurrency: exchangeState.fromCurrency || "tether",
        toAmount: exchangeState.toAmount,
        toCurrency: exchangeState.toCurrency || "permoney"
      };
      setDisplayData(newData);
      saveToLocalStorage(newData);
    } else if (dataLoaded) {
      console.log(' Using data from localStorage');
    } else {
      console.log(' Using default data');
      saveToLocalStorage(displayData);
    }
    
    setIsHydrated(true);
    const saveData = () => {
      if (exchangeState.fromAmount || exchangeState.toAmount) {
        saveToLocalStorage({
          fromAmount: exchangeState.fromAmount,
          fromCurrency: exchangeState.fromCurrency,
          toAmount: exchangeState.toAmount,
          toCurrency: exchangeState.toCurrency
        });
      }
    };
    
    saveData();
    const handleBeforeUnload = () => {
      saveToLocalStorage(displayData);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [exchangeState, location.state]);
  const handleSuccessClick = () => {
    saveToLocalStorage(displayData);
        const dataForNextPage = {
      ...displayData,
      timestamp: new Date().getTime(),
      savedFrom: 'waiting-success-click'
    };
    
    localStorage.setItem('lastExchangeData', JSON.stringify(dataForNextPage));
        navigate("/pmsuccess", { 
      state: { 
        transactionData: displayData 
      } 
    });
  };
  const handleFailedClick = () => {
    saveToLocalStorage(displayData);
        const dataForNextPage = {
      ...displayData,
      timestamp: new Date().getTime(),
      savedFrom: 'waiting-failed-click'
    };
    localStorage.setItem('lastExchangeData', JSON.stringify(dataForNextPage));
        navigate("/pmfailed", { 
      state: { 
        transactionData: displayData 
      } 
    });
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
      <ContainerConfirm sx={{ height: "667px" }}>
        <div>Loading transaction data...</div>
      </ContainerConfirm>
    );
  }

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
           disabled placeholder="X09aa998ee454c456255daf3ac94908f1dcfb7033"
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
           disabled placeholder="100 USDT"
          />
        </BoxDetail>

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