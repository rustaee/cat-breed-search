## Give me a cat 🐈 — Cat Breeds Gallery

A Next.js + Material UI application that interacts with The Cat API to display a responsive grid of cat images. It supports server-side rendering for the initial load, breed search with autocomplete, and infinite scrolling to fetch more images as you scroll.

### Features

- Server-side rendered initial page with cat images.
- Responsive MUI grid and cards that adapt to screen size.
- Breed search autocomplete; selecting a breed filters the grid.
- Infinite scrolling with IntersectionObserver to load additional pages.
- API proxy routes under `/api` to keep the API key server-side.

### Tech

- Next.js App Router (TypeScript), Material UI, The Cat API.

## Setup

1) Prerequisites
- Node.js 18+ and npm.

2) Install dependencies
```
npm install
```

3) Configure environment
- Create a `.env.local` file at the project root (or copy `.env.example`):
```
CAT_API_KEY=YOUR_CAT_API_KEY
CAT_API_BASE=https://api.thecatapi.com/v1
```

4) Run locally
```
npm run dev
```
Open http://localhost:3000

5) Build
```
npm run build && npm start
```

## Project Structure

- `src/app/page.tsx`: SSR page that fetches initial images and renders the gallery.
- `src/components/ClientGallery.tsx`: Client wrapper implementing breed filter + infinite scroll.
- `src/components/BreedAutocomplete.tsx`: MUI autocomplete wired to `/api/breeds`.
- `src/components/CatGrid.tsx` and `src/components/CatCard.tsx`: Responsive grid and image cards.
- `src/app/api/images/route.ts` and `src/app/api/breeds/route.ts`: Proxy routes to The Cat API.
- `src/lib/catapi.ts`: Fetch helper that adds the `x-api-key` header and uses `CAT_API_BASE`.
- `src/theme.ts`: MUI theme (adjustable to match the Figma styling).
 - `src/app/error.tsx` and `src/app/global-error.tsx`: Error boundaries with MUI-styled fallbacks. Use the reset button to retry.
 - `src/app/error.tsx` and `src/app/global-error.tsx`: Error boundaries with MUI-styled fallbacks. Use the reset button to retry.
 - `src/app/loading.tsx`: Route-level suspense fallback streaming a skeleton while initial data resolves.
 - `src/components/ClientErrorBoundary.tsx`: Client-side error boundary catching runtime interaction errors not handled by route boundaries.
 - `src/components/AsyncBreedDetails.tsx`: Example async server component suitable for a nested <Suspense> boundary.

## Notes & Decisions

- Initial render is server-side: `page.tsx` calls The Cat API from the server to deliver the first image grid.
- Infinite scrolling: Implemented via `IntersectionObserver` with a bottom sentinel and paginated `/api/images` calls.
- Breed filtering: Selecting a breed resets pagination and refetches page 0.
- Images: Using native `img` for simplicity and broad remote host support. If switching to `next/image`, configure `images.remotePatterns` in `next.config.ts`.
- Styling: Base MUI theme provided in `src/theme.ts`; tweak colors/typography to align with the Figma file as needed.

## Scripts

- `npm run dev`: Start dev server.
- `npm run build`: Build for production.
- `npm start`: Start production server.

## License / Attribution

- Cat images and breed data come from [The Cat API](https://thecatapi.com/).
