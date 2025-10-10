import { NextRequest, NextResponse } from "next/server";
import {
  searchMarketplaceFiles,
  fetchMarketplaceFile,
} from "@/lib/crawler/github-search";
import { validateMarketplaces } from "@/lib/crawler/validator";
import { mergeMarketplaces } from "@/lib/crawler/storage";
import { batchFetchStars } from "@/lib/crawler/github-stars";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes max execution time

/**
 * Crawl GitHub for Claude Code marketplaces
 * Protected by CRON_SECRET for Vercel Cron
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Verify Vercel Cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("Starting marketplace crawl...");

    // Step 1: Search GitHub for marketplace files
    const searchResults = await searchMarketplaceFiles();
    console.log(`Found ${searchResults.length} potential marketplaces`);

    if (searchResults.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No new marketplaces found",
        discovered: 0,
        added: 0,
        updated: 0,
        removed: 0,
        duration: Date.now() - startTime,
      });
    }

    // Step 2: Fetch marketplace.json files
    const fetchedFiles = await Promise.allSettled(
      searchResults.map(async (result) => ({
        repo: result.repo,
        content: await fetchMarketplaceFile(result.repo),
      }))
    );

    const validFiles = fetchedFiles
      .filter(
        (result): result is PromiseFulfilledResult<{ repo: string; content: string }> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);

    console.log(`Successfully fetched ${validFiles.length} marketplace files`);

    // Step 3: Validate marketplace files
    const validationResults = await validateMarketplaces(validFiles);

    const validMarketplaces = validationResults
      .filter((result) => result.valid && result.marketplace)
      .map((result) => result.marketplace!);

    const failedValidations = validationResults.filter((result) => !result.valid);

    console.log(`Validated ${validMarketplaces.length} marketplaces`);
    console.log(`Failed validations: ${failedValidations.length}`);

    if (failedValidations.length > 0) {
      console.error("Validation errors:", failedValidations);
    }

    // Step 4: Fetch GitHub stars for all marketplaces
    console.log("Fetching GitHub stars...");
    const repos = validMarketplaces.map((m) => m.repo);
    const starMap = await batchFetchStars(repos);

    // Add stars to marketplaces
    const marketplacesWithStars = validMarketplaces.map((marketplace) => ({
      ...marketplace,
      stars: starMap.get(marketplace.repo) ?? marketplace.stars,
      starsFetchedAt: starMap.get(marketplace.repo) !== null
        ? new Date().toISOString()
        : marketplace.starsFetchedAt,
    }));

    console.log(`Fetched stars for ${Array.from(starMap.values()).filter(s => s !== null).length} repos`);

    // Step 5: Merge with existing marketplaces
    const allDiscoveredRepos = new Set(searchResults.map((r) => r.repo));
    const mergeResult = await mergeMarketplaces(marketplacesWithStars, allDiscoveredRepos);

    console.log(
      `Crawl complete: ${mergeResult.added} added, ${mergeResult.updated} updated, ${mergeResult.removed} removed`
    );

    // Return summary
    return NextResponse.json({
      success: true,
      discovered: searchResults.length,
      fetched: validFiles.length,
      validated: validMarketplaces.length,
      added: mergeResult.added,
      updated: mergeResult.updated,
      removed: mergeResult.removed,
      total: mergeResult.total,
      failed: failedValidations.length,
      errors: failedValidations.slice(0, 10).map((f) => ({
        errors: f.errors,
      })),
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Crawl failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Manual trigger endpoint (POST method)
 * Can be used to trigger crawl manually without cron
 */
export async function POST(request: NextRequest) {
  // Use the same logic as GET
  return GET(request);
}
