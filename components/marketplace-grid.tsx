"use client";

import { Marketplace } from "@/lib/types";
import { MarketplaceCard } from "@/components/marketplace-card";

interface MarketplaceGridProps {
  marketplaces: Marketplace[];
}

export function MarketplaceGrid({ marketplaces }: MarketplaceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {marketplaces.map((marketplace) => (
        <MarketplaceCard key={marketplace.repo} marketplace={marketplace} />
      ))}

      {/* Add Marketplace Card */}
      <a href="/submit" className="block h-full">
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
  );
}
