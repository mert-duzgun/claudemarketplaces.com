import { Marketplace } from "@/lib/types";
import marketplacesData from "./marketplaces.json";

const marketplaces = marketplacesData as Marketplace[];

export function getAllMarketplaces(): Marketplace[] {
  return marketplaces;
}

export function getMarketplacesByCategory(category: string): Marketplace[] {
  return marketplaces.filter((m) => m.categories.includes(category));
}

export function getCategories(): string[] {
  const categories = new Set(marketplaces.flatMap((m) => m.categories));
  return Array.from(categories).sort();
}
