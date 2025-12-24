import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CardTableDashboard } from "../components/styled/HompageStylee";
import Copy from "../assets/images/partner/Frame (16).svg?react";
import DiamondIcon from "../assets/images/partner/Vector (5).svg?react";
import User from "../assets/images/partner/Vector (6).svg?react";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";

const impressionData = [
  {
    amount: 100,
    to: "X09aa998ee454c456255def3ac94908f1dcfb7033",
    date: "25-02-2023",
    status: "Done",
  },
  {
    amount: 100,
    to: "X09aa998ee454c456255def3ac94908f1dcfb7033",
    date: "25-02-2023",
    status: "Waiting",
  },
  {
    amount: 100,
    to: "X09aa998ee454c456255def3ac94908f1dcfb7033",
    date: "25-02-2023",
    status: "Done",
  },
  {
    amount: 100,
    to: "X09aa998ee454c456255def3ac94908f1dcfb7033",
    date: "25-02-2023",
    status: "Done",
  },
];

const PartnerPage: React.FC = () => {
  const [affiliateLink, setAffiliateLink] = useState(
    "https://En.Flashobmen.Com/Ref/Acc0c4c8-C799-4216-A281-6d3d3c43a480"
  );

  const [openWithdraw, setOpenWithdraw] = useState(false);

  const handleCopy = () => {
    if (affiliateLink) {
      navigator.clipboard.writeText(affiliateLink);
    }
  };

  return (
    <CardTableDashboard>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#ABABAB",
          ml: "19px",
          mt: "39px",
        }}
      >
        Your Affiliate Link :
      </Typography>

      <Box
        sx={{
          display: "flex",
          backgroundColor: "#242C39",
          marginLeft: "19px",
          marginTop: "16px",
          borderRadius: "10px",
          width: "811px",
          height: "59px",
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          value={affiliateLink}
          onChange={(e) => setAffiliateLink(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: {
              pl: "26px",
              pt: "2px",
              fontSize: "16px",
              fontWeight: 700,
              color: "#FFFFFF",
            },
          }}
        />
        <Button
          variant="text"
          startIcon={<Copy />}
          onClick={handleCopy}
          sx={{
            backgroundColor: " #353F50",
            color: "#ABABAB",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 700,
            width: "106px",
            height: "59px",
            borderRadius: "0 10px 10px 0",
            "&:hover": { backgroundColor: "#454F60" },
          }}
        >
          Copy
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: "23px", mt: "11px", ml: "19px" }}>
        <Box
          sx={{
            width: "517px",
            height: "112px",
            backgroundColor: "#242C39",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "92px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Box
              sx={{
                width: 67,
                height: 67,
                borderRadius: "50%",
                backgroundColor: " #40A578",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: " 0px 4px 20px 0px #40A57880",
                marginLeft: "17px",
              }}
            >
              <DiamondIcon />
            </Box>
            <Box>
              <Typography
                sx={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700 }}
              >
                Your Wallet Balance
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#40A578",
                  marginTop: "14px",
                }}
              >
                320 USDT
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() => setOpenWithdraw(true)}
            sx={{
              backgroundColor: " #40A578",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "16px",
              width: "133px",
              height: "51px",
              "&:hover": { backgroundColor: "#368d66" },
            }}
          >
            Withdraw
          </Button>
        </Box>

        <Box
          sx={{
            backgroundColor: " #242C39",
            width: "271px",
            height: "112px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "19px",
          }}
        >
          <Box
            sx={{
              width: 67,
              height: 67,
              marginLeft: "32px",
              borderRadius: "50%",
              backgroundColor: " #F05A7E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 20px 0px #F05A7E80",
            }}
          >
            <User />
          </Box>
          <Box>
            <Typography
              sx={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700 }}
            >
              Your Friends
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: " #F05A7E",
                mt: "14px",
              }}
            >
              32
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          color: " #ABABAB",
          fontSize: "16px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mt: "11px",
          ml: "19px",
        }}
      >
        Get 10{" "}
        <DiamondIcon
          style={{
            width: "20px",
            filter:
              "invert(52%) sepia(57%) saturate(451%) hue-rotate(106deg) brightness(91%) contrast(85%)",
          }}
        />{" "}
        For Each Invited User
      </Typography>

      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "24px",
          color: "#FFFFFF",
          mt: "44px",
          ml: "19px",
        }}
      >
        Your Impressions
      </Typography>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          backgroundColor: "#242C39",
          backgroundImage: "none",
          borderRadius: "10px",
          width: "812px",
          height: "322px",
          mt: "22px",
          ml: "18px",
          border: "1px solid #313A4B",
          overflow: "hidden",
        }}
      >
        <Table sx={{ height: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ height: "60px" }}>
              <TableCell
                sx={{
                  color: "#ABABAB",
                  borderBottom: "1px solid #2D3748",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
                align="center"
              >
                Amount
              </TableCell>
              <TableCell
                sx={{
                  color: "#ABABAB",
                  borderBottom: "1px solid #2D3748",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
                align="center"
              >
                To
              </TableCell>
              <TableCell
                sx={{
                  color: "#ABABAB",
                  borderBottom: "1px solid #2D3748",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
                align="center"
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: "#ABABAB",
                  borderBottom: "1px solid #2D3748",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
                align="center"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {impressionData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  height: "calc((322px - 60px) / 4)",
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                <TableCell
                  align="center"
                  sx={{ borderBottom: " 1px solid #313A4B" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "9px",
                      color: "#FFFFFF",
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  >
                    <Tether /> {row.amount}
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #313A4B",
                    color: "#FFFFFF",
                    fontWeight: 400,
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.to}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #313A4B",
                    color: "#FFFFFF",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {row.date}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #313A4B" }}
                >
                  <Chip
                    label={row.status}
                    sx={{
                      backgroundColor:
                        row.status === "Done" ? " #40A578" : "#F3AC76",
                      color: row.status === "Done" ? " #035610" : "#603E0F",
                      fontWeight: 700,
                      borderRadius: "8px",
                      fontSize: "12px",
                      width: "93px",
                      height: "29px",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* مودال نهایی مطابق تصویر MODAL.JPG */}
      <Dialog
        open={openWithdraw}
        onClose={() => setOpenWithdraw(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            backgroundColor: " #2A3342",
            borderRadius: "20px",
            width: "744px",
            height: "396px",
            border: "",
            backgroundImage: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "32px",
              fontWeight: 700,
              mt: "32px",
              ml: "59px",
            }}
          >
            Withdraw
          </Typography>
          <IconButton
            onClick={() => setOpenWithdraw(false)}
            sx={{ color: "#ABABAB", p: 0, mt: "44px", mr: "58px" }}
          >
            <CloseIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid #364153",
            mt: "34px",
            width: "627px",
            ml: "59px",
          }}
        >
          <Typography
            sx={{
              color: "#ABABAB",
              mt: "41px",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            Your Wallet Address (Tether TRC20)
          </Typography>

          <TextField
            fullWidth
            placeholder="Address"
            variant="standard"
            autoComplete="off"
            InputProps={{
              disableUnderline: true,
              sx: {
                backgroundColor: " #242C39",
                borderRadius: "10px",
                height: "57px",
                width:"627px",
                padding: "0 26px",
                fontSize: "16px",
                fontWeight: 700,
                "& input::placeholder": {
                  color: "#FFFFFF",
                  opacity: 1,
                },
              },
            }}
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: " #1D8D94",
            color: "#FFFFFF",
            width:"627px",
            mt:"20px",
            ml:"59px",
            height: "57px",
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "20px",
            fontWeight: 700,
            boxShadow: "none",
            
          }}
        >
          Confirm
        </Button>
      </Dialog>
    </CardTableDashboard>
  );
};

export default PartnerPage;
