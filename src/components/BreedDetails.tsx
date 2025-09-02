import { Box, Chip, Link, Paper, Stack, Typography } from "@mui/material";

type Breed = {
  id: string;
  name: string;
  origin?: string;
  temperament?: string;
  description?: string;
  wikipedia_url?: string;
  life_span?: string;
};

export default function BreedDetails({ breed }: { breed: Breed }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2, borderColor: "divider", backgroundColor: "#fff" }}>
      <Stack gap={1.5}>
        <Stack direction="row" alignItems="baseline" gap={1}>
          <Typography variant="h6" fontWeight={700}>{breed.name}</Typography>
          {breed.origin && (
            <Chip label={breed.origin} size="small" color="primary" variant="outlined" />
          )}
          {breed.life_span && (
            <Chip label={`${breed.life_span} yrs`} size="small" variant="outlined" />
          )}
        </Stack>
        {breed.temperament && (
          <Typography variant="body2" color="text.secondary">{breed.temperament}</Typography>
        )}
        {breed.description && (
          <Typography variant="body1">{breed.description}</Typography>
        )}
        {breed.wikipedia_url && (
          <Box>
            <Link href={breed.wikipedia_url} target="_blank" rel="noopener noreferrer">
              Learn more on Wikipedia
            </Link>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}

