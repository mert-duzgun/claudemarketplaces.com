import { put, head } from "@vercel/blob";
import { Marketplace } from "@/lib/types";
import fs from "fs/promises";
import path from "path";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const MARKETPLACES_FILE = path.join(
  process.cwd(),
  "lib/data/marketplaces.json"
);

/**
 * Read marketplaces from Vercel Blob (if available) or local file
 */
export async function readMarketplaces(): Promise<Marketplace[]> {
  try {
    // Try to read from Vercel Blob first (production)
    if (BLOB_TOKEN) {
      const blobUrl = "https://blob.vercel-storage.com/marketplaces.json";

      try {
        await head(blobUrl, { token: BLOB_TOKEN });
        const response = await fetch(blobUrl);
        if (response.ok) {
          const data = await response.json();
          console.log("Loaded marketplaces from Vercel Blob");
          return data;
        }
      } catch {
        console.log("Vercel Blob not available, falling back to local file");
      }
    }

    // Fallback to local file
    const fileContent = await fs.readFile(MARKETPLACES_FILE, "utf-8");
    const data = JSON.parse(fileContent);
    console.log("Loaded marketplaces from local file");
    return data;
  } catch (error) {
    console.error("Error reading marketplaces:", error);
    return [];
  }
}

/**
 * Write marketplaces to Vercel Blob and local file
 */
export async function writeMarketplaces(
  marketplaces: Marketplace[]
): Promise<void> {
  const jsonData = JSON.stringify(marketplaces, null, 2);

  try {
    // Write to Vercel Blob (production)
    if (BLOB_TOKEN) {
      await put("marketplaces.json", jsonData, {
        access: "public",
        token: BLOB_TOKEN,
        contentType: "application/json",
      });
      console.log("Saved marketplaces to Vercel Blob");
    }

    // Also write to local file (for git tracking and development)
    await fs.writeFile(MARKETPLACES_FILE, jsonData, "utf-8");
    console.log("Saved marketplaces to local file");
  } catch (error) {
    console.error("Error writing marketplaces:", error);
    throw error;
  }
}

/**
 * Merge discovered marketplaces with existing ones
 */
export async function mergeMarketplaces(
  discovered: Marketplace[]
): Promise<{
  added: number;
  updated: number;
  total: number;
}> {
  const existing = await readMarketplaces();
  const existingMap = new Map(existing.map((m) => [m.repo, m]));

  let added = 0;
  let updated = 0;

  for (const marketplace of discovered) {
    const existingMarketplace = existingMap.get(marketplace.repo);

    if (existingMarketplace) {
      // Update existing marketplace
      existingMarketplace.description = marketplace.description;
      existingMarketplace.pluginCount = marketplace.pluginCount;
      existingMarketplace.categories = marketplace.categories;
      existingMarketplace.lastUpdated = new Date().toISOString();
      // Keep original discoveredAt and source
      updated++;
    } else {
      // Add new marketplace
      existingMap.set(marketplace.repo, marketplace);
      added++;
    }
  }

  const merged = Array.from(existingMap.values());
  await writeMarketplaces(merged);

  return {
    added,
    updated,
    total: merged.length,
  };
}
