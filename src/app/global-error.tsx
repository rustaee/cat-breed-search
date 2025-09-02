"use client";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { Alert, Button, Container, Stack, Typography } from "@mui/material";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Container maxWidth="sm" sx={{ py: 8 }}>
            <Stack gap={2}>
              <Typography variant="h4" fontWeight={700}>
                Unexpected error
              </Typography>
              <Alert severity="error">
                {error.message || "The app ran into a problem."}
              </Alert>
              {error?.digest && (
                <Typography variant="caption" color="text.secondary">
                  Reference: {error.digest}
                </Typography>
              )}
              <Stack direction="row" gap={2}>
                <Button variant="contained" color="primary" onClick={() => reset()}>
                  Reload
                </Button>
              </Stack>
            </Stack>
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}

