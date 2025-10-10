"use client";

import { Badge } from "@/components/ui/badge";

interface MarketplaceFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function MarketplaceFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: MarketplaceFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selectedCategory === null ? "default" : "outline"}
        className="cursor-pointer capitalize"
        onClick={() => onCategoryChange(null)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCategoryChange(null);
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={selectedCategory === null}
      >
        All
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className="cursor-pointer capitalize"
          onClick={() => onCategoryChange(category)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCategoryChange(category);
            }
          }}
          role="button"
          tabIndex={0}
          aria-pressed={selectedCategory === category}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
