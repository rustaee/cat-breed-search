"use client";
import * as React from "react";
import { Alert, Box, Button } from "@mui/material";

/**
 * Catches errors thrown inside client components (event handlers, effects, rendering)
 * that are NOT caught by Next.js route-level error.tsx boundaries.
 */
export class ClientErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("ClientErrorBoundary caught: ", error, info);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <Box sx={{ p: 2 }} role="alert" aria-live="assertive">
          <Alert severity="error" sx={{ mb: 2 }}>
            {this.state.error.message || "Something went wrong."}
          </Alert>
          <Button variant="outlined" onClick={this.reset}>
            Try again
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ClientErrorBoundary;
