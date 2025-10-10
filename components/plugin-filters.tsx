"use client";

import { Badge } from "@/components/ui/badge";

interface PluginFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function PluginFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: PluginFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selectedCategory === null ? "default" : "outline"}
        className="cursor-pointer"
        onClick={() => onCategoryChange(null)}
      >
        All
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className="cursor-pointer capitalize"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
