"use client";
import { createTheme } from "@mui/material/styles";

// Basic MUI theme; can be extended to match Figma later
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5E35B1", // Deep purple accent
    },
    secondary: {
      main: "#26A69A", // Teal accent
    },
  },
});

