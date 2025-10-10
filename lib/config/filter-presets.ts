import { Marketplace } from "@/lib/types";

/**
 * Filter preset identifiers
 * Presets are mutually exclusive with category filters
 */
export type FilterPreset = "all" | "recently-published";

/**
 * Configuration for a filter preset
 */
export interface FilterPresetConfig {
  id: FilterPreset;
  label: string;
  description: string;
  predicate: (marketplace: Marketplace) => boolean;
}

/**
 * Check if a marketplace was recently published
 * A marketplace is recently published when it was just discovered (discoveredAt === lastUpdated)
 */
export function isRecentlyPublished(marketplace: Marketplace): boolean {
  return Boolean(
    marketplace.discoveredAt &&
      marketplace.lastUpdated &&
      marketplace.discoveredAt === marketplace.lastUpdated
  );
}

/**
 * All available filter presets
 * Order determines display order in UI
 */
export const FILTER_PRESETS: FilterPresetConfig[] = [
  {
    id: "all",
    label: "All",
    description: "Show all marketplaces",
    predicate: () => true,
  },
  {
    id: "recently-published",
    label: "Recently published",
    description: "Show newly discovered marketplaces from the last crawl",
    predicate: isRecentlyPublished,
  },
];

/**
 * Get a filter preset by ID
 */
export function getFilterPreset(id: string): FilterPresetConfig | undefined {
  return FILTER_PRESETS.find((preset) => preset.id === id);
}
