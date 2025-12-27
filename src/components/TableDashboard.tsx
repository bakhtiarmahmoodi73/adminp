import React, { useState, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Typography,
  Chip,
  Pagination,
  Link,
} from "@mui/material";
import SearchIcon from "../assets/images/table/Vector (4).svg?react";
import { CardTableDashboard } from "./styled/HompageStylee";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
interface Transaction {
  id: number;
  from: string;
  to: string;
  amount: number;
  received: number;
  date: string;
  status: "Successful" | "Unsuccessful" | "Checking";
}
const RAW_DATA: Transaction[] = Array.from({ length: 28 }).map((_, index) => ({
  id: index + 1,
  from: "USDT",
  to: "PM",
  amount: 1000,
  received: 1200,
  date: "25-02-2023",
  status:
    index === 1 ? "Unsuccessful" : index === 2 ? "Checking" : "Successful",
}));

const TransactionsTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;
  const filteredData = useMemo(() => {
    return RAW_DATA.filter(
      (item) =>
        item.from.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    return filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredData, page]);
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Successful":
        return { bg: "#40A578", color: "#035610" };
      case "Unsuccessful":
        return { bg: "#F66066", color: "#60140F" };
      case "Checking":
        return { bg: "#F3AC76", color: "#603E0F" };
      default:
        return { bg: "#444", color: "#fff" };
    }
  };

  return (
    <CardTableDashboard>
      <TextField
        placeholder="Search..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        sx={{
          width: "812px",
          marginTop: "20px",
          marginLeft: "22px",
          backgroundColor: "#242C39",
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            "& fieldset": { border: "none" },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#FFFFFF",
            marginLeft: 0,
            opacity: 1,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ margin: 0, padding: 0 }}>
              <SearchIcon style={{ marginLeft: "10px" }} />
            </InputAdornment>
          ),
        }}
      />

      <Typography
        sx={{
          marginTop: "41px",
          marginLeft: "24px",
          color: "#FFFFFF",
          fontSize: "24px",
          fontWeight: 600,
          lineHeight: "100%",
          letterSpacing: "0%",
        }}
      >
        Latest Transactions
      </Typography>

      <TableContainer
        sx={{
          backgroundColor: "#242C39",
          borderRadius: "15px",
          boxShadow: "none",
          width: "812px",
          height: "523px",
          marginLeft: "22px",
          marginTop: "22px",
          border: " 1px solid #313A4B",
        }}
      >
        <Table sx={{}}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  borderBottom: "1px solid #313A4B",
                  color: "#ABABAB",
                  fontSize: "14px",
                  fontWeight: 700,
                },
              }}
            >
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Received</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td": {
                    borderBottom: "none",
                  },
                  "& td": {
                    borderBottom: " 1px solid #313A4B",
                  },
                }}
              >
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "9px",
                    }}
                  >
                    <Tether />
                    {row.from}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "9px",
                    }}
                  >
                    <PerMoney />
                    {row.to}
                  </Box>
                </TableCell>

                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.received}</TableCell>
                <TableCell align="center">{row.date}</TableCell>

                <TableCell align="center">
                  <Chip
                    label={row.status}
                    sx={{
                      backgroundColor: getStatusStyle(row.status).bg,
                      color: getStatusStyle(row.status).color,
                      borderRadius: "8px",
                      fontWeight: 700,
                      minWidth: "100px",
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <Link
                    href="#"
                    sx={{
                      color: "#FFFFFF",
                      textDecoration: "none",
                    }}
                  >
                    See More
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, v) => setPage(v)}
          hidePrevButton
          hideNextButton
          sx={{
            "& .MuiPaginationItem-root": { border: "1px solid #313A4B" },
            "& .Mui-selected": {
              backgroundColor: "#40A578 !important",
              color: "#fff",
              borderRadius: "50%",
            },
          }}
        />
      </Box>
    </CardTableDashboard>
  );
};

export default TransactionsTable;