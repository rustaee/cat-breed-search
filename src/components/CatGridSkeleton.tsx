import { Grid, Skeleton } from "@mui/material";

type Props = { count?: number; ariaLabel?: string };

export default function CatGridSkeleton({ count = 12, ariaLabel }: Props) {
  const items = Array.from({ length: count });
  return (
    <Grid container spacing={2} role={ariaLabel ? "status" : undefined} aria-label={ariaLabel} aria-live={ariaLabel ? "polite" : undefined}>
      {items.map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Skeleton variant="rounded" height={240} sx={{ mb: 1, borderRadius: 2 }} aria-hidden="true" />
          <Skeleton width="70%" aria-hidden="true" />
          <Skeleton width="40%" aria-hidden="true" />
        </Grid>
      ))}
    </Grid>
  );
}

