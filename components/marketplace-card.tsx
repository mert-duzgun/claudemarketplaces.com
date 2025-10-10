"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Marketplace } from "@/lib/types";
import { Github, Package, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

interface MarketplaceCardProps {
  marketplace: Marketplace;
}

export function MarketplaceCard({ marketplace }: MarketplaceCardProps) {
  const repoUrl = `https://github.com/${marketplace.repo}`;
  const installCommand = `/plugin marketplace add ${marketplace.repo}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-serif">{marketplace.repo}</CardTitle>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span className="text-sm">{marketplace.pluginCount}</span>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <CardDescription className="line-clamp-2">
            {marketplace.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {marketplace.categories && marketplace.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {marketplace.categories.slice(0, 4).map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs capitalize">
                    {category}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-2 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <code className="text-xs bg-muted px-2 py-1 rounded flex-1 break-all">
                  {installCommand}
                </code>
                <button
                  onClick={handleCopy}
                  className="shrink-0 p-1.5 hover:bg-muted rounded transition-colors cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
