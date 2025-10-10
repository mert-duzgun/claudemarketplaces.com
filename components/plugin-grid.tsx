"use client";

import { useState, useMemo } from "react";
import { Plugin } from "@/lib/types";
import { PluginCard } from "@/components/plugin-card";
import { PluginSearch } from "@/components/plugin-search";
import { PluginFilters } from "@/components/plugin-filters";

interface PluginGridProps {
  plugins: Plugin[];
  categories: string[];
}

export function PluginGrid({ plugins, categories }: PluginGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPlugins = useMemo(() => {
    let filtered = plugins;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.keywords?.some((k) => k.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [plugins, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <PluginSearch value={searchQuery} onChange={setSearchQuery} />

      {/* Filters */}
      <div>
        <h3 className="text-sm font-medium mb-3">Categories</h3>
        <PluginFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredPlugins.length} {filteredPlugins.length === 1 ? "plugin" : "plugins"} found
      </p>

      {/* Plugin Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => (
          <PluginCard key={plugin.id} plugin={plugin} />
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No plugins found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
