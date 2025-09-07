"use client";
import * as React from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/theme";

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

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

