import React, { ChangeEvent } from "react";
import {
  ButtonMain,
  CardMainBottm,
  CardMainTop,
  ChangeButtonComponent,
  TextFieldMainTop,
  TypographyMain,
} from "../styled/HompageStylee";
import {
  InputAdornment,
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import {
  setFromCurrency,
  setToCurrency,
  setFromAmount,
  setToAmount,
  swapCurrencies,
  setStep,
  setExchangeFormData,
} from "../../store/slices/exchangeSlice";

import Tether from "../../assets/images/tether/tether (2) 1.svg?react";
import Permoney from "../../assets/images/perfectmoney/Group 5.svg?react";
import Change from "../../assets/images/changebutton/Group 4 (2).svg?react";

const MainComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { fromCurrency, toCurrency, fromAmount, toAmount } = useAppSelector(
    (state) => state.exchange
  );

  const menuStyles = {
    PaperProps: {
      sx: {
        width: "230px",
        backgroundColor: "#2A3342",
        borderRadius: "12px",
        mt: "8px",
        ml:'30px',
        "& .MuiMenuItem-root": {
          padding: "12px 16px",
          gap: "40px",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.15)" },
          },
        },
      },
    },
  };

  const calculateToAmount = (amount: string, fromCurr: string, toCurr: string): string => {
    if (!amount) return "";
    const numAmount = parseFloat(amount);
    if (fromCurr === "tether" && toCurr === "permoney") return (numAmount / 2).toFixed(2);
    if (fromCurr === "permoney" && toCurr === "tether") return (numAmount * 2).toFixed(2);
    return numAmount.toFixed(2);
  };

  const calculateFromAmount = (amount: string, fromCurr: string, toCurr: string): string => {
    if (!amount) return "";
    const numAmount = parseFloat(amount);
    if (fromCurr === "tether" && toCurr === "permoney") return (numAmount * 2).toFixed(2);
    if (fromCurr === "permoney" && toCurr === "tether") return (numAmount / 2).toFixed(2);
    return numAmount.toFixed(2);
  };

  const handleSwap = () => {
    const currentFromAmount = fromAmount;
    const currentToAmount = toAmount;
    dispatch(swapCurrencies());
    dispatch(setFromAmount(currentToAmount));
    dispatch(setToAmount(currentFromAmount));
  };

  const handleFromAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      dispatch(setFromAmount(value));
      if (value) {
        const calculatedAmount = calculateToAmount(value, fromCurrency, toCurrency);
        dispatch(setToAmount(calculatedAmount));
      } else {
        dispatch(setToAmount(""));
      }
    }
  };

  const handleToAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      dispatch(setToAmount(value));
      if (value) {
        const calculatedAmount = calculateFromAmount(value, fromCurrency, toCurrency);
        dispatch(setFromAmount(calculatedAmount));
      } else {
        dispatch(setFromAmount(""));
      }
    }
  };
  const handleFromCurrencyChange = (e: SelectChangeEvent<string>) => {
    const newFromCurrency = e.target.value;
    const newToCurrency = newFromCurrency === "tether" ? "permoney" : "tether";
    
    dispatch(setFromCurrency(newFromCurrency));
    dispatch(setToCurrency(newToCurrency)); 

    if (fromAmount) {
      const calculatedAmount = calculateToAmount(fromAmount, newFromCurrency, newToCurrency);
      dispatch(setToAmount(calculatedAmount));
    }
  };
  const handleToCurrencyChange = (e: SelectChangeEvent<string>) => {
    const newToCurrency = e.target.value;
    const newFromCurrency = newToCurrency === "tether" ? "permoney" : "tether";

    dispatch(setToCurrency(newToCurrency));
    dispatch(setFromCurrency(newFromCurrency)); 

    if (fromAmount) {
      const calculatedAmount = calculateToAmount(fromAmount, newFromCurrency, newToCurrency);
      dispatch(setToAmount(calculatedAmount));
    }
  };

  const handleMakeExchange = () => {
    if (!fromAmount || parseFloat(fromAmount) < 100) {
      alert("Please enter a valid amount (minimum $100)");
      return;
    }
    dispatch(setExchangeFormData({ fromCurrency, toCurrency, fromAmount, toAmount }));
    dispatch(setStep(2));
    navigate("/confirm");
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <CardMainTop>
        <TypographyMain>From:</TypographyMain>
        <TextFieldMainTop
          value={fromAmount}
          onChange={handleFromAmountChange}
          placeholder="1000"
          autoComplete="off"
          type="text"
          inputMode="numeric"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={{ display: "flex", alignItems: "center", pr: "70px" }}>
                  <Box sx={{ width: "1px", height: "38px", background: "#5B5F5E", mx: "17px" }} />
                  <Select
                    value={fromCurrency}
                    onChange={handleFromCurrencyChange}
                    variant="standard"
                    disableUnderline
                    MenuProps={menuStyles}
                    sx={{
                      color: "#ABABAB",
                      "& .MuiSelect-select": { display: "flex", alignItems: "center", gap: "9px" },
                    }}
                  >
                    <MenuItem value="tether">
                      <Tether width={25} height={25} />
                      <Typography sx={{ fontSize: "14px", color: "#979E9C" }}>USDT (TRC20)</Typography>
                    </MenuItem>
                    <MenuItem value="permoney">
                      <Permoney width={25} height={25} />
                      <Typography sx={{ fontSize: "14px", color: "#979E9C" }}>Perfect Money</Typography>
                    </MenuItem>
                  </Select>
                </Box>
              </InputAdornment>
            ),
          }}
        />
        <TypographyMain sx={{ mt: "14px" }}>Min : $100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max: $4832</TypographyMain>
      </CardMainTop>

      <Box sx={{ position: "absolute", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
        <ChangeButtonComponent onClick={handleSwap}>
          <Change />
        </ChangeButtonComponent>
      </Box>

      <CardMainBottm>
        <TypographyMain>To:</TypographyMain>
        <TextFieldMainTop
          value={toAmount}
          onChange={handleToAmountChange}
          placeholder="1000"
          autoComplete="off"
          type="text"
          inputMode="numeric"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={{ display: "flex", alignItems: "center", pr: "70px" }}>
                  <Box sx={{ width: "1px", height: "38px", background: "#5B5F5E", mx: "17px" }} />
                  <Select
                    value={toCurrency}
                    onChange={handleToCurrencyChange}
                    variant="standard"
                    disableUnderline
                    MenuProps={menuStyles}
                    sx={{
                      color: "#ABABAB",
                      "& .MuiSelect-select": { display: "flex", alignItems: "center", gap: "9px" },
                    }}
                  >
                    <MenuItem value="tether">
                      <Tether width={25} height={25} />
                      <Typography sx={{ fontSize: "14px", color: "#979E9C" }}>USDT (TRC20)</Typography>
                    </MenuItem>
                    <MenuItem value="permoney">
                      <Permoney width={25} height={25} />
                      <Typography sx={{ fontSize: "14px", color: "#979E9C" }}>Perfect Money</Typography>
                    </MenuItem>
                  </Select>
                </Box>
              </InputAdornment>
            ),
          }}
        />
        <TypographyMain sx={{ mt: "14px" }}>Min : $100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max: $4832</TypographyMain>
      </CardMainBottm>

      <ButtonMain onClick={handleMakeExchange}>Make Exchange</ButtonMain>
    </Box>
  );
};

export default MainComponent;