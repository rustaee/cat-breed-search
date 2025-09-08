"use client";
import { createTheme, type ThemeOptions } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

// Generate design tokens for light or dark mode
export function getDesignTokens(mode: PaletteMode): ThemeOptions {
  const isDark = mode === "dark";
  return {
    palette: {
      mode,
      primary: {
        main: "#00BCD4",
        dark: "#006064",
        light: "#4dd9e8",
        contrastText: "#ffffff",
      },
      background: isDark
        ? { default: "rgba(22, 27, 34, 1)", paper: "#161b22" }
        : { default: "#ffffff", paper: "#ffffff" },
      divider: isDark ? "#30363d" : "#E0E0E0",
      text: isDark
        ? { primary: "#f5f7fa", secondary: "#9aa4b1" }
        : { primary: "#111827", secondary: "#4b5563" },
    },
    shape: { borderRadius: 12 },
    typography: {
      h4: { fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: isDark
              ? "rgba(22, 27, 34, 0.8)"
              : "rgba(255, 255, 255, 0.5)",
            backdropFilter: "saturate(180%) blur(12px)",
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }),
        },
        defaultProps: { elevation: 0, color: "default" },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: isDark ? "#1e2630" : "#ECEFF1",
            border: `1px solid ${theme.palette.divider}`,
            transition: "box-shadow 200ms ease, transform 200ms ease",
          }),
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? "rgba(22, 27, 34, 1)" : "#ffffff",
            color: isDark ? "#f5f7fa" : "#111827",
            scrollbarColor: isDark ? "#30363d #161b22" : "#cbd5e1 #ffffff",
            "&::-webkit-scrollbar": { width: 10 },
            "&::-webkit-scrollbar-track": {
              background: isDark ? "#161b22" : "#ffffff",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: isDark ? "#30363d" : "#b0bec5",
              borderRadius: 8,
              border: "2px solid transparent",
              backgroundClip: "content-box",
            },
          },
        },
      },
    },
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
  };
}

export function createAppTheme(mode: PaletteMode) {
  return createTheme(getDesignTokens(mode));
}

export const theme = createAppTheme("dark");
