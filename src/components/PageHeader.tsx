"use client";
import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import BreedAutocomplete from "@/components/BreedAutocomplete";

type BreedOption = { id: string; name: string };

type Props = {
  breed: BreedOption | null;
  onBreedChange: (next: BreedOption | null) => void;
};

export default function PageHeader({ breed, onBreedChange }: Props) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1.5, gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
          <Typography variant="h5" component="h1" sx={{ flexGrow: { xs: 1, sm: 0 }, fontWeight: 700 }}>
            Give me a cat 🐈
          </Typography>
          <Box sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: 340 } }}>
            <BreedAutocomplete value={breed} onChange={onBreedChange} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

