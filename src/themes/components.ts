import { Components } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

export const components: Components<Theme> = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        all: "unset",
        display: "flex",
        flexDirection: "column",
        maxWidth: "560px",
        width: "100%",
        borderRadius: "30px",
        mx: "auto",
        my: 0,
        backgroundColor: theme.palette.mode === "dark" ? "#2A3342" : "#fff",
        p: 0,
        marginTop: "157px",
        marginBottom: "152px",
      }),
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiOutlinedInput-root": {
          height: "57px",
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: 700,
          backgroundColor: theme.palette.mode === "dark" ? "#242C39" : "#f5f5f5",
          p: "0 !important",
          m: "0 !important",

          "& .MuiOutlinedInput-input": {
            p: "0 !important",
            m: "0 !important",
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
            paddingLeft: "14px !important",
            paddingRight: "14px !important",
            color: theme.palette.mode === "dark" ? "#FFFFFF !important" : "#000",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            p: "0",
            m: "0",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.mode === "dark" ? "#242C39" : "#e0e0e0",
          },

          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F66066 !important",
            borderWidth: "2px !important",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1D8D94",
          },
          
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1D8D94",
          },
        },

        "& input": {
          color: theme.palette.mode === "dark" ? "#FFFFFF !important" : "#000",
        },

        "& .MuiFormHelperText-root": {
          color: "#F66066",
          ml: "0",
          mt: "5px",
          fontSize: "14px",
          fontWeight: 500,
          p: "0",
          position: "absolute",
          top: "100%",
          left: "0",
        },
      }),
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: 700,
        textTransform: "none",
        height: "60px",
      },
    },
    variants: [
      {
        props: { variant: 'contained', color: 'primary' },
        style: {
          backgroundColor: "#1D8D94",
          color: "#FFFFFF",
          boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
          "&:hover": {
            backgroundColor: "#16666c",
          },
        },
      },
    ],
  },

  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: "'Niramit', sans-serif",
      },
    },
    variants: [
      {
        props: { variant: 'body2' },
        style: {
          color: "#ABABAB",
          fontSize: "16px",
          fontWeight: 700,
        },
      },
    ],
  },

  MuiLink: {
    styleOverrides: {
      root: {
        color: "#1D8D94",
        fontSize: "16px",
        fontWeight: 700,
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
};