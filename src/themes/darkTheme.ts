import { createTheme } from "@mui/material/styles";
import { components } from "./components";

export const darkTheme = createTheme({
  typography: {
    fontFamily: "Niramit, sans-serif",
    fontWeightBold: 700,
  },


  components: {
    MuiTypography: {
  styleOverrides: {
    root: {
      textTransform: 'none',
    }
  }
},
    ...components,
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Niramit';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('/fonts/niramit/Niramit-Regular.ttf') format('truetype');
        }

        @font-face {
          font-family: 'Niramit';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url('/fonts/niramit/Niramit-Bold.ttf') format('truetype');
        }

        body {
          background-color: #242C39;
          margin: 0;
          padding: 0;
          min-height: 100vh;
        }
      `,
    },
  },

  palette: {
    mode: "dark",
    background: {
      default: "#242C39",
      paper: "#242C39",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#ABABAB",
    },
    primary: {
      main: "#1D8D94",
    },
    error: {
      main: "#F66066",
    },
  },
});
