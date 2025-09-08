"use client";
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import * as React from "react";
import { ColorModeContext } from "@/theme/ThemeRegistry";
import { useTheme, alpha } from "@mui/material/styles";
import BreedAutocomplete from "@/components/BreedAutocomplete";

type BreedOption = {
  id: string;
  name: string;
  origin?: string;
  temperament?: string;
  description?: string;
  wikipedia_url?: string;
  life_span?: string;
};

type Props = {
  breed: BreedOption | null;
  onBreedChange: (next: BreedOption | null) => void;
};

export default function PageHeader({ breed, onBreedChange }: Props) {
  const { mode, toggle } = React.useContext(ColorModeContext);
  return (
  <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1.5, gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
          <Typography variant="h5" component="h1" sx={{ flexGrow: { xs: 1, sm: 0 }, fontWeight: 700 }}>
            Give me a cat 🐈
          </Typography>
          <Box sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: 340 } }}>
            <BreedAutocomplete value={breed} onChange={onBreedChange} />
          </Box>
          <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
            <IconButton onClick={toggle} color="inherit" aria-label="toggle color mode" sx={{ ml: 1 }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
