"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
import { Marketplace } from "@/lib/types";

export function useMarketplaceFilters(marketplaces: Marketplace[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q") || "";
  const selectedCategories = useMemo(
    () => searchParams.get("categories")?.split(",").filter(Boolean) || [],
    [searchParams]
  );

  const updateURL = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Filter and sort marketplaces
  const filteredMarketplaces = useMemo(() => {
    let filtered = marketplaces;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.repo.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.categories.some((cat) => cat.toLowerCase().includes(query))
      );
    }

    // Category filter (multi-select with OR logic)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((m) =>
        selectedCategories.some((cat) => m.categories.includes(cat))
      );
    }

    // Sort by stars (highest first)
    return filtered.sort((a, b) => {
      const starsA = a.stars ?? 0;
      const starsB = b.stars ?? 0;
      return starsB - starsA;
    });
  }, [marketplaces, searchQuery, selectedCategories]);

  return {
    searchQuery,
    selectedCategories,
    filteredMarketplaces,
    filteredCount: filteredMarketplaces.length,
    setSearchQuery: (q: string) => updateURL({ q: q || null }),
    toggleCategory: (cat: string) => {
      const newCats = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat];
      updateURL({ categories: newCats.length ? newCats.join(",") : null });
    },
    clearFilters: () => updateURL({ q: null, categories: null }),
  };
}
