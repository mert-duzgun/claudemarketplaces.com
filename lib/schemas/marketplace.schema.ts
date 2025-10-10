import { z } from "zod";

// Schema for a plugin within a marketplace
export const PluginSchema = z.object({
  name: z.string().min(1), // Only name and source are required
  source: z.string().min(1),
  id: z.string().optional(),
  description: z.string().optional(),
  version: z.string().optional(),
  author: z
    .union([
      z.object({
        name: z.string(),
        email: z.string().email().optional(),
      }),
      z.string(), // Author can be a string or object
    ])
    .optional(),
  category: z.string().optional(),
  license: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

// Schema for the marketplace.json file structure from Claude Code docs
export const ClaudeMarketplaceFileSchema = z.object({
  name: z.string().min(1),
  owner: z.union([
    z.string(),
    z.object({
      name: z.string(),
      email: z.string().optional(),
    }),
  ]),
  description: z.string().optional(),
  version: z.string().optional(),
  pluginRoot: z.string().optional(),
  plugins: z.array(PluginSchema).min(1), // At least one plugin required
});

// Schema for our internal marketplace representation
export const MarketplaceSchema = z.object({
  repo: z.string().regex(/^[\w-]+\/[\w-]+$/, "Must be in format: owner/repo"),
  description: z.string(),
  pluginCount: z.number().int().min(0),
  categories: z.array(z.string()),
  discoveredAt: z.string().datetime().optional(),
  lastUpdated: z.string().datetime().optional(),
  source: z.enum(["manual", "auto"]).optional(),
});

export type ClaudeMarketplaceFile = z.infer<typeof ClaudeMarketplaceFileSchema>;
export type MarketplaceData = z.infer<typeof MarketplaceSchema>;
