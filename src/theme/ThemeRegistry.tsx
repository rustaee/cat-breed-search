"use client";
import * as React from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "@/theme";
import type { PaletteMode } from "@mui/material";

export const ColorModeContext = React.createContext<{ mode: PaletteMode; toggle: () => void }>({
  mode: "light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // Create a cache for Emotion styles.
  // This cache will help with server-side rendering and style injection.
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: "mui", prepend: true });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    // Keep track of all inserted styles.
    cache.insert = (...args: any) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return (prevInsert as any)(...args);
    };

    // Flush the cache and return the inserted styles.
    const flush = () => {
      const content = inserted.map((name) => (cache.inserted as any)[name]).join("");
      inserted = [];
      return content;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{ __html: flush() }}
    />
  ));

  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const muiTheme = React.useMemo(() => createAppTheme(mode), [mode]);
  const ctx = React.useMemo(() => ({ mode, toggle: () => setMode(m => (m === "light" ? "dark" : "light")) }), [mode]);

  // Ensure body background updates even if previous injected style tags linger (SSR + streaming)
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = muiTheme.palette.background.default;
      document.body.style.color = muiTheme.palette.text.primary;
    }
  }, [muiTheme]);

  return (
    <CacheProvider value={cache}>
      <ColorModeContext.Provider value={ctx}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}

