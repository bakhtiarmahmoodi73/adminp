import React from "react";
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
} from "@mui/material";

import Tether from "../../assets/images/tether/tether (2) 1.svg?react";
import Permoney from "../../assets/images/perfectmoney/Group 5.svg?react";
import Change from "../../assets/images/changebutton/Group 4 (2).svg?react";

function MainComponent() {
  // state برای مدیریت swap
  const [isSwapped, setIsSwapped] = React.useState(false);
  
  // state برای مقادیر کارت‌ها
  const [topValue, setTopValue] = React.useState("tether");
  const [bottomValue, setBottomValue] = React.useState("permoney");
  const [topAmount, setTopAmount] = React.useState("");
  const [bottomAmount, setBottomAmount] = React.useState("");

  // تابع برای جابجا کردن همه چیز
  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    
    // جابجا کردن مقادیر
    const tempValue = topValue;
    setTopValue(bottomValue);
    setBottomValue(tempValue);
    
    const tempAmount = topAmount;
    setTopAmount(bottomAmount);
    setBottomAmount(tempAmount);
  };

  // انتخاب کامپوننت‌ها بر اساس وضعیت swap
  const TopCard = isSwapped ? CardMainBottm : CardMainTop;
  const BottomCard = isSwapped ? CardMainTop : CardMainBottm;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* کارت بالا */}
      <TopCard>
        <TypographyMain>{isSwapped ? "To" : "From"}&nbsp;:</TypographyMain>
        <TextFieldMainTop
          value={topAmount}
          onChange={(e) => setTopAmount(e.target.value)}
          placeholder="1000"
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
                    value={topValue}
                    onChange={(e) => setTopValue(e.target.value)}
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
        />
        <TypographyMain sx={{ mt: "14px" }}>
          Min : $100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max: $4832
        </TypographyMain>
      </TopCard>

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

      {/* کارت پایین */}
      <BottomCard>
        <TypographyMain>{isSwapped ? "From" : "To"}&nbsp;:</TypographyMain>
        <TextFieldMainTop
          value={bottomAmount}
          onChange={(e) => setBottomAmount(e.target.value)}
          placeholder="1000"
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
                    value={bottomValue}
                    onChange={(e) => setBottomValue(e.target.value)}
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
        />
        <TypographyMain sx={{ mt: "14px" }}>
          Min : $100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max: $4832
        </TypographyMain>
      </BottomCard>

      <ButtonMain>Make Exchange</ButtonMain>
    </Box>
  );
}

export default MainComponent;