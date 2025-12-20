import React, { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";

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

  // تابع بارگذاری داده‌ها از همه منابع
  const loadDataFromAllSources = () => {
    console.log('🔄 SendFailedPage: Loading data from all sources...');
    
    // 1. اول از location.state چک کن (اگر از FlowSendPage یا WaitingPage آمده‌ای)
    if (location.state?.transactionData || location.state?.exchangeData) {
      const transactionData = location.state.transactionData || location.state.exchangeData;
      console.log('🎯 SendFailedPage: Using data from location state:', transactionData);
      
      const dataToSave = {
        fromAmount: transactionData.fromAmount || "100",
        fromCurrency: transactionData.fromCurrency || "tether",
        toAmount: transactionData.toAmount || "120",
        toCurrency: transactionData.toCurrency || "permoney",
        timestamp: new Date().getTime(),
        savedFrom: 'location-state'
      };
      
      // ذخیره در localStorage برای استفاده بعدی
      localStorage.setItem('lastFailedExchange', JSON.stringify(dataToSave));
      localStorage.setItem('currentFailedTransaction', JSON.stringify(dataToSave));
      localStorage.setItem('exchangeData', JSON.stringify(dataToSave));
      
      setDisplayData(dataToSave);
      return true;
    }
    
    // 2. از localStorage با اولویت‌های مختلف چک کن
    const priorityKeys = [
      'lastFailedExchange',
      'currentFailedTransaction',
      'lastExchangeData',
      'exchangeData',
      'exchangeFlowData',
      'backupExchangeData',
      'exchangeWaitingData',
      'currentTransaction'
    ];
    
    let latestData = null;
    let latestTimestamp = 0;
    
    for (const key of priorityKeys) {
      try {
        const dataStr = localStorage.getItem(key);
        if (dataStr) {
          const data = JSON.parse(dataStr);
          if (data.fromAmount && data.timestamp) {
            // بررسی تازگی داده (تا 1 ساعت قبل)
            const isRecent = new Date().getTime() - data.timestamp < 60 * 60 * 1000;
            if (isRecent && data.timestamp > latestTimestamp) {
              latestTimestamp = data.timestamp;
              latestData = data;
              console.log(`📦 SendFailedPage: Found recent data in ${key}:`, data);
            }
          }
        }
      } catch (error) {
        console.error(`⚠️ SendFailedPage: Error reading ${key}:`, error);
      }
    }
    
    if (latestData) {
      setDisplayData({
        fromAmount: latestData.fromAmount || "100",
        fromCurrency: latestData.fromCurrency || "tether",
        toAmount: latestData.toAmount || "120",
        toCurrency: latestData.toCurrency || "permoney"
      });
      console.log('✅ SendFailedPage: Loaded from localStorage:', latestData);
      return true;
    }
    
    // 3. از Redux چک کن
    if (exchangeState.fromAmount && exchangeState.toAmount) {
      console.log('📝 SendFailedPage: Using data from Redux:', exchangeState);
      const dataToSave = {
        fromAmount: exchangeState.fromAmount,
        fromCurrency: exchangeState.fromCurrency || "tether",
        toAmount: exchangeState.toAmount,
        toCurrency: exchangeState.toCurrency || "permoney",
        timestamp: new Date().getTime(),
        savedFrom: 'redux-store'
      };
      
      localStorage.setItem('lastFailedExchange', JSON.stringify(dataToSave));
      setDisplayData(dataToSave);
      return true;
    }
    
    console.log('⚠️ SendFailedPage: No recent data found, using defaults');
    return false;
  };

  useEffect(() => {
    console.log('🚀 SendFailedPage mounted');
    console.log('📊 exchangeState:', exchangeState);
    console.log('📍 location state:', location.state);
    
    // بارگذاری داده‌ها
    const dataLoaded = loadDataFromAllSources();
    
    // اگر هیچ داده‌ای پیدا نشد و صفحه تازه لود شده
    if (!dataLoaded && !location.state && Object.keys(exchangeState).length === 0) {
      console.log('🔙 SendFailedPage: No data found, using defaults');
      // ذخیره داده‌های پیش‌فرض
      const defaultData = {
        ...displayData,
        timestamp: new Date().getTime(),
        savedFrom: 'default-fallback'
      };
      localStorage.setItem('lastFailedExchange', JSON.stringify(defaultData));
    }
    
    setIsHydrated(true);
    
    // ذخیره stepper status
    localStorage.setItem("stepperStatus", "complete");
    
    // ذخیره داده‌های فعلی در localStorage
    const saveCurrentData = () => {
      const dataToSave = {
        ...displayData,
        timestamp: new Date().getTime(),
        page: 'send-failed',
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem('currentFailedTransaction', JSON.stringify(dataToSave));
      localStorage.setItem('lastFailedExchange', JSON.stringify(dataToSave));
    };
    
    saveCurrentData();
    
    // ذخیره هنگام بسته شدن صفحه
    const handleBeforeUnload = () => {
      console.log('💾 SendFailedPage: Saving before unload');
      saveCurrentData();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [exchangeState, location.state]);

  // تابع برای بازگشت به استپ اول
  const handleTryAgain = () => {
    // پاک کردن وضعیت stepper از localStorage
    localStorage.removeItem("stepperStatus");
    
    // پاک کردن داده‌های تراکنش قدیمی
    localStorage.removeItem('exchangeData');
    localStorage.removeItem('exchangeWaitingData');
    localStorage.removeItem('lastExchangeData');
    localStorage.removeItem('currentTransaction');
    localStorage.removeItem('currentFailedTransaction');
    localStorage.removeItem('lastFailedExchange');
    localStorage.removeItem('exchangeFlowData');
    
    // هدایت کاربر به صفحه اصلی
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

  // اگر هنوز داده‌ها بارگذاری نشده، اسکلت نشان بده
  if (!isHydrated) {
    return (
      <ContainerConfirm sx={{ height: "684px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TypographySuccess>Loading transaction data...</TypographySuccess>
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