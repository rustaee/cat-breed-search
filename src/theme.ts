"use client";
import { createTheme } from "@mui/material/styles";

// Basic MUI theme; can be extended to match Figma later
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00BCD4",
      dark: "#006064",
      light: "#00BCD4",
      contrastText: "#ffffff",
    },
    background: { default: "#ffffff", paper: "#ffffff" },
    divider: "#E0E0E0",
  },
  shape: { borderRadius: 12 },
  typography: {
    h4: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#111827",
          borderBottom: "1px solid #E0E0E0",
        },
      },
      defaultProps: { elevation: 0, color: "default" },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ECEFF1",
          border: "1px solid #E0E0E0",
          transition: "box-shadow 200ms ease, transform 200ms ease",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  }
});
