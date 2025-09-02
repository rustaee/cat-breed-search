"use client";
import { createTheme } from "@mui/material/styles";

// Basic MUI theme; can be extended to match Figma later
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#5E35B1" }, // Deep purple
    secondary: { main: "#26A69A" }, // Teal
    background: { default: "#fafafa", paper: "#ffffff" },
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
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        },
      },
      defaultProps: { elevation: 0, color: "default" },
    },
    MuiCard: {
      styleOverrides: {
        root: { transition: "box-shadow 200ms ease, transform 200ms ease" },
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
