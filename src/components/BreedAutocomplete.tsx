"use client";
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

type BreedOption = {
  id: string;
  name: string;
  origin?: string;
  temperament?: string;
  description?: string;
  wikipedia_url?: string;
  life_span?: string;
};

type Props = {
  value: BreedOption | null;
  onChange: (next: BreedOption | null) => void;
};

export default function BreedAutocomplete({ value, onChange }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<BreedOption[]>([]);
  const [loading, setLoading] = useState(false);

  const q = inputValue.trim();
  const debouncedQ = useDebounce(q, 250);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      setLoading(true);
      try {
        const url = debouncedQ ? `/api/breeds?q=${encodeURIComponent(debouncedQ)}` : "/api/breeds";
        const res = await fetch(url);
        const data = (await res.json()) as BreedOption[];
        if (!ignore) setOptions(data);
      } catch {
        if (!ignore) setOptions([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [debouncedQ]);

  return (
    <Autocomplete
      value={value}
      onChange={(_, next) => onChange(next)}
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      options={options}
      getOptionLabel={(o) => o.name}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      clearOnBlur={false}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search breeds"
          placeholder="Type to search…"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={16} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
