import { createTheme } from "@mui/material/styles";

const appTheme: any = createTheme({
  palette: {
    primary: {
      main: "#228C22",
    },
    secondary: {
      main: "#252525",
    },
    background: {
      default: "#fff6e9",
    },
    text: {
      primary: "#222222",
      secondary: "#717171",
    },
  },
  typography: {
    fontFamily: "Helvetica",
    h1: {
      fontSize: "54px",
      fontWeight: 700,
      letterSpacing: "1.08px",
    },
    h2: {
      fontSize: "33px",
      fontWeight: 700,
      letterSpacing: "0.66px",
    },
    button: {
      fontSize: "17px",
      fontWeight: 400,
      letterSpacing: "0.64px",
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "700",
        },
      },
    },
  },
});

export default appTheme;
