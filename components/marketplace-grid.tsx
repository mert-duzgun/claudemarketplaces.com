"use client";

import { useState, useMemo } from "react";
import { Marketplace } from "@/lib/types";
import { MarketplaceCard } from "@/components/marketplace-card";
import { MarketplaceFilters } from "@/components/marketplace-filters";

interface MarketplaceGridProps {
  marketplaces: Marketplace[];
  categories: string[];
}

export function MarketplaceGrid({ marketplaces, categories }: MarketplaceGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredMarketplaces = useMemo(() => {
    let filtered = marketplaces;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((m) => m.categories.includes(selectedCategory));
    }

    return filtered;
  }, [marketplaces, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div>
        <h3 className="text-2xl font-serif mb-3">Categories</h3>
        <MarketplaceFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredMarketplaces.length}{" "}
        {filteredMarketplaces.length === 1 ? "marketplace" : "marketplaces"} found
      </p>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarketplaces.map((marketplace) => (
          <MarketplaceCard key={marketplace.repo} marketplace={marketplace} />
        ))}

        {/* Add Marketplace Card */}
        <a
          href="/submit"
          className="block h-full"
        >
          <div className="h-full border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary/50 hover:bg-accent/50 cursor-pointer min-h-[280px]">
            <div className="text-4xl">+</div>
            <div className="text-center">
              <h3 className="font-serif text-lg mb-2">Share Your Marketplace</h3>
              <p className="text-sm text-muted-foreground">
                Contribute to the Claude Code community
              </p>
            </div>
          </div>
        </a>
      </div>

      {filteredMarketplaces.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No marketplaces found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
