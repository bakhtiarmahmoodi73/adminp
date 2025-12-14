// components/mainpage/MainComponent.tsx
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

  // خواندن state از Redux
  const { fromCurrency, toCurrency, fromAmount, toAmount } = useAppSelector(
    (state) => state.exchange
  );

  // تابع برای جابجا کردن ارزها
  const handleSwap = () => {
    dispatch(swapCurrencies());
  };

  // تابع برای تغییر مقدار From
  const handleFromAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // فقط اعداد و نقطه اعشار مجاز هستند
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      dispatch(setFromAmount(value));

      // محاسبه خودکار مبلغ مقصد (نرخ فرضی)
      if (value) {
        const exchangeRate = 1; // نرخ واقعی را از API دریافت کنید
        const calculatedAmount = (parseFloat(value) * exchangeRate).toFixed(2);
        dispatch(setToAmount(calculatedAmount.toString()));
      } else {
        dispatch(setToAmount(""));
      }
    }
  };

  // تابع برای تغییر مقدار To
  const handleToAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // فقط اعداد و نقطه اعشار مجاز هستند
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      dispatch(setToAmount(value));
    }
  };

  // تابع برای تغییر ارز From
  const handleFromCurrencyChange = (e: SelectChangeEvent<string>) => {
    dispatch(setFromCurrency(e.target.value));
  };

  // تابع برای تغییر ارز To
  const handleToCurrencyChange = (e: SelectChangeEvent<string>) => {
    dispatch(setToCurrency(e.target.value));
  };

  // تابع برای رفتن به صفحه Confirm
  const handleMakeExchange = () => {
    // اعتبارسنجی اولیه
    if (!fromAmount || parseFloat(fromAmount) < 100) {
      alert("Please enter a valid amount (minimum $100)");
      return;
    }

    if (parseFloat(fromAmount) > 4832) {
      alert("Maximum amount is $4832");
      return;
    }

    // ذخیره اطلاعات فرم در Redux
    dispatch(setExchangeFormData({
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
    }));

    // تغییر step به 2 (Confirm)
    dispatch(setStep(2));

    // هدایت به صفحه تأیید
    navigate("/confirm");
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* کارت بالا (From) */}
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
                  <Box
                    sx={{
                      width: "1px",
                      height: "38px",
                      background: "#5B5F5E",
                      mx: "17px",
                    }}
                  />
                  <Select
                    value={fromCurrency}
                    onChange={handleFromCurrencyChange}
                    variant="standard"
                    disableUnderline
                    sx={{
                      color: "#ABABAB",
                      "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                      },
                    }}
                  >
                    <MenuItem value="tether">
                      <Tether width={25} height={25} />
                      <Typography sx={{ fontSize: "14px", color: "#979E9C" }}>
                        USDT (TRC20)
                      </Typography>
                    </MenuItem>
                    <MenuItem value="permoney">
                      <Permoney width={25} height={25} />
                      <Typography sx={{ fontSize: "14px", color: "#979E9C" }}>
                        Perfect Money
                      </Typography>
                    </MenuItem>
                  </Select>
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                "-webkit-appearance": "none",
                margin: 0,
              },
            "& input[type=number]": {
              "-moz-appearance": "textfield",
            },
          }}
        />
        <TypographyMain sx={{ mt: "14px" }}>
          Min : $100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max: $4832
        </TypographyMain>
      </CardMainTop>

      {/* دکمه تغییر */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ChangeButtonComponent onClick={handleSwap}>
          <Change />
        </ChangeButtonComponent>
      </Box>

      {/* کارت پایین (To) */}
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
                  <Box
                    sx={{
                      width: "1px",
                      height: "38px",
                      background: "#5B5F5E",
                      mx: "17px",
                    }}
                  />
                  <Select
                    value={toCurrency}
                    onChange={handleToCurrencyChange}
                    variant="standard"
                    disableUnderline
                    sx={{
                      color: "#ABABAB",
                      "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                      },
                    }}
                  >
                    <MenuItem value="tether">
                      <Tether width={25} height={25} />
                      <Typography sx={{ fontSize: "14px", color: "#979E9C" }}>
                        USDT (TRC20)
                      </Typography>
                    </MenuItem>
                    <MenuItem value="permoney">
                      <Permoney width={25} height={25} />
                      <Typography sx={{ fontSize: "14px", color: "#979E9C" }}>
                        Perfect Money
                      </Typography>
                    </MenuItem>
                  </Select>
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                "-webkit-appearance": "none",
                margin: 0,
              },
            "& input[type=number]": {
              "-moz-appearance": "textfield",
            },
          }}
        />
        <TypographyMain sx={{ mt: "14px" }}>
          Min : $100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max: $4832
        </TypographyMain>
      </CardMainBottm>

      <ButtonMain onClick={handleMakeExchange}>Make Exchange</ButtonMain>
    </Box>
  );
};

export default MainComponent;