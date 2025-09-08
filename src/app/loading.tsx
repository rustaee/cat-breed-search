import { Container } from "@mui/material";
import CatGridSkeleton from "@/components/CatGridSkeleton";

// Route-level loading UI: streamed immediately while the page's server data loads.
export default function Loading() {
  return (
    <main id="main-loading" aria-busy="true" aria-live="polite">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CatGridSkeleton />
      </Container>
    </main>
  );
}
