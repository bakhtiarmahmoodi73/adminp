import { useState } from "react";
import { TextField, Paper, Box } from "@mui/material";
import {
  BoxQr,
  BoxQrDetail,
  PicQr,
  TypographyDetail,
} from "./styled/HompageStylee";
import { QRCodeSVG } from "qrcode.react";
import Arrow from "../assets/images/arrow/Frame (6).svg?react";

const QRCodeGenerator = () => {
  const [network, setNetwork] = useState("TRON");
  const [qrText, setQrText] = useState(
    "X09aa998ee454c456255daf3ac94908f1dc"
  );

  return (
    <BoxQr>
      <BoxQrDetail>
        <TypographyDetail
          sx={{ fontSize: "20px", lineHeight: "48px", padding: 0 }}
        >
          Choose Network And To Receive 120 Perfect Money, Please Deposit 100
          Tether to The Tether Address Below:
        </TypographyDetail>

        <TextField
          fullWidth
          value={qrText}
          onChange={(e) => setQrText(e.target.value)}
          InputProps={{
            startAdornment: (
              <Paper
                elevation={0}
                sx={{
                  width: "126px",
                  height: "57px",
                  backgroundColor: "#1D8D94",
                  color: "#fff",
                  borderRadius: "10px 0px 0px 10px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "0 40px 0 16px",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontWeight: 700,
                    outline: "none",
                    cursor: "pointer",
                    appearance: "none",
                    fontSize: "16px",
                    borderRadius: "10px 0px 0px 10px",
                  }}
                >
                  <option value="TRON">TRON</option>
                  <option value="ERC20">ERC20</option>
                  <option value="BEP20">BEP20</option>
                </select>
                <Box
                  sx={{
                    position: "absolute",
                    right: "16px",
                    pointerEvents: "none",
                  }}
                >
                  <Arrow
                    style={{ marginTop: "5px", width: "24px", height: "24px" }}
                  />
                </Box>
              </Paper>
            ),
            sx: {
              fontWeight: 700,
              fontSize: "16px",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#242C39",
              borderRadius: "10px",
              color: "#FFFFFF",
              height: "57px",
              paddingLeft: 0,
            },
            "& fieldset": {
              border: "none",
            },
          }}
        />
      </BoxQrDetail>


<PicQr>

    <QRCodeSVG
      value={`${network} ${qrText}`}
      size={191}  
      bgColor="#2A3342"
      fgColor="#ABABAB"
      level="H"
    />
</PicQr>

    </BoxQr>
  );
};

export default QRCodeGenerator;
