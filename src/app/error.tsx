"use client";
import { useEffect } from "react";
import { Alert, Button, Container, Stack, Typography } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to an error reporting service
    // eslint-disable-next-line no-console
    console.error("App error boundary:", error);
  }, [error]);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stack gap={2}>
        <Typography variant="h4" fontWeight={700}>
          Something went wrong
        </Typography>
        <Alert severity="error">
          {error.message || "An unexpected error occurred."}
        </Alert>
        {error?.digest && (
          <Typography variant="caption" color="text.secondary">
            Reference: {error.digest}
          </Typography>
        )}
        <Stack direction="row" gap={2}>
          <Button variant="contained" color="primary" onClick={() => reset()}>
            Try again
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

