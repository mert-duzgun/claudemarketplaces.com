"use client";

import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MarketplaceGrid } from "@/components/marketplace-grid";
import { MarketplaceSearch } from "@/components/marketplace-search";
import { Badge } from "@/components/ui/badge";
import { getAllMarketplaces, getCategories } from "@/lib/data/marketplaces";
import { useMarketplaceFilters } from "@/lib/hooks/use-marketplace-filters";

function MarketplaceContent() {
  const marketplaces = getAllMarketplaces();
  const categories = getCategories();

  const {
    searchQuery,
    selectedCategories,
    filteredMarketplaces,
    filteredCount,
    setSearchQuery,
    toggleCategory,
    clearFilters,
  } = useMarketplaceFilters(marketplaces);

  const hasActiveFilters = searchQuery || selectedCategories.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <MarketplaceSearch
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* Horizontal Scrollable Categories */}
      <div className="mb-6 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge
            variant={selectedCategories.length === 0 ? "default" : "outline"}
            className="cursor-pointer capitalize shrink-0"
            onClick={() => clearFilters()}
          >
            All
          </Badge>
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <Badge
                key={category}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer capitalize shrink-0"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredCount} {filteredCount === 1 ? "marketplace" : "marketplaces"}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Marketplace Grid */}
      {filteredMarketplaces.length > 0 ? (
        <MarketplaceGrid marketplaces={filteredMarketplaces} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No marketplaces found matching your criteria.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-9 bg-muted rounded-md" />
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-7 w-20 bg-muted rounded-md" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-muted rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        }>
          <MarketplaceContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
