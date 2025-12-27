import { useState, useEffect, useCallback } from "react";
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
  TextFieldReceive,
  ButtonRecieve,
} from "../components/styled/HompageStylee";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";
import { TextField, Paper, Box } from "@mui/material";
import Arrow from "../assets/images/arrow/Frame (6).svg?react";
import FigmaTimer from "../components/Timer/Timer";

const FlowReceivePage: React.FC = () => {
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

  const safeSave = useCallback((data: any) => {
    if (!data.fromAmount || data.fromAmount === "") return;
    localStorage.setItem('exchangeData', JSON.stringify(data));
    localStorage.setItem('exchangeReceiveData', JSON.stringify(data));
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('exchangeData');
    let hasLoadedFromStorage = false;

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const isRecent = new Date().getTime() - (parsedData.timestamp || 0) < 30 * 60 * 1000;
      
      if (isRecent && parsedData.fromAmount) {
        setDisplayData({
          fromAmount: parsedData.fromAmount,
          fromCurrency: parsedData.fromCurrency,
          toAmount: parsedData.toAmount,
          toCurrency: parsedData.toCurrency
        });
        hasLoadedFromStorage = true;
      }
    }
    if (!hasLoadedFromStorage && exchangeState.fromAmount) {
      const reduxData = {
        fromAmount: exchangeState.fromAmount,
        fromCurrency: exchangeState.fromCurrency || "tether",
        toAmount: exchangeState.toAmount,
        toCurrency: exchangeState.toCurrency || "permoney",
        timestamp: new Date().getTime()
      };
      setDisplayData(reduxData);
      safeSave(reduxData);
    }

    setIsHydrated(true);
  }, [exchangeState, safeSave]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  const getSendIcon = () => displayData.fromCurrency === "tether" ? <Tether /> : <PerMoney />;
  const getSendCurrencyText = () => displayData.fromCurrency === "tether" ? "USDT" : "Perfect Money";
  const getReceiveIcon = () => displayData.toCurrency === "tether" ? <Tether /> : <PerMoney />;
  const getReceiveCurrencyText = () => displayData.toCurrency === "tether" ? "USDT" : "Perfect Money";

  const handleSubmit = () => {
    const finalData = {
      fromAmount: displayData.fromAmount,
      fromCurrency: displayData.fromCurrency,
      toAmount: displayData.toAmount,
      toCurrency: displayData.toCurrency,
      timestamp: new Date().getTime(),
      transactionId: `tx_${Date.now()}`
    };
    
    localStorage.setItem('exchangeData', JSON.stringify(finalData));
    localStorage.setItem('waitingPageData', JSON.stringify(finalData));
    
    navigate("/waiting", { state: { transactionData: finalData } });
  };

  if (!isHydrated) {
    return (
      <ContainerConfirm sx={{ height: "939px" }}>
        <div style={{color: 'white', textAlign: 'center', paddingTop: '50px'}}>Loading...</div>
      </ContainerConfirm>
    );
  }

  return (
    <ContainerConfirm sx={{ height: "939px" }}>
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

        <TypographyDetail sx={{ marginTop: "16px", fontSize: "16px" }}>
          Perfect Money Code :
        </TypographyDetail>
        <TextFieldReceive placeholder="Please Enter Perfect Money Code " />

        <TypographyDetail sx={{ marginTop: "16px", fontSize: "16px" }}>
          Perfect Money Number :
        </TypographyDetail>
        <TextFieldReceive placeholder="Please Enter Perfect Money Number  " />

        <TypographyDetail sx={{ marginTop: "16px", fontSize: "16px" }}>
          Choose Network And Enter Tether Address :
        </TypographyDetail>

        <TextField
          fullWidth
          placeholder="Please Enter Address"
          InputProps={{
            startAdornment: (
              <Paper
                elevation={0}
                sx={{
                  width: "126px",
                  height: "57px",
                  backgroundColor: "#1D8D94",
                  color: "#FFFFFF",
                  borderRadius: "10px 0 0 10px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <select
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "0 40px 0 16px",
                    background: "transparent",
                    border: "none",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    outline: "none",
                    cursor: "pointer",
                    appearance: "none",
                    fontSize: "16px",
                    borderRadius: "10px 0 0 10px",
                  }}
                >
                  <option value="TRON">TRON</option>
                </select>
                <Box sx={{ position: "absolute", right: "16px", pointerEvents: "none" }}>
                  <Arrow width={24} height={24} />
                </Box>
              </Paper>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#242C39",
              borderRadius: "10px",
              height: "57px",
              paddingLeft: 0,
              marginTop:"12px"
            },
            "& .MuiOutlinedInput-input": {
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 700,
              paddingLeft: "20px",
              "&::placeholder": { color: "#FFFFFF", opacity: 1 },
            },
            "& fieldset": { border: "none" },
          }}
        />
        <ButtonRecieve onClick={handleSubmit}>Submit</ButtonRecieve>
      </BoxConfirmRoot>
    </ContainerConfirm>
  );
};

export default FlowReceivePage;