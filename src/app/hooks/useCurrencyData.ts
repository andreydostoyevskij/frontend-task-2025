import { useState, useCallback, useEffect, useMemo } from "react";
import { Currency } from "../types";
import { fetchCurrenciesWithBalances } from "@/services/api";

export function useCurrencyData() {
  const [allCurrencies, setAllCurrencies] = useState<Currency[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const isFiltered = search.trim() !== "";

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await fetchCurrenciesWithBalances({ page, limit: 20 });

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setAllCurrencies((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const newUnique = data.filter((c) => !existingIds.has(c.id));
          return [...prev, ...newUnique];
        });
        setPage((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    loadMore();
  }, []);

  const filtered = useMemo(() => {
    let result = [...allCurrencies];

    if (search.trim()) {
      result = result.filter((c) =>
        [c.name, c.code, c.symbol, String(c.balance)]
          .filter(Boolean)
          .some((field) =>
            field.toString().toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "balance") {
      result.sort((a, b) => (b.balance ?? 0) - (a.balance ?? 0));
    }

    return result;
  }, [allCurrencies, search, sortBy]);

  return {
    currencies: filtered,
    setSearch,
    setSortBy,
    loading,
    loadMore,
    hasMore,
    isFiltered,
  };
}
