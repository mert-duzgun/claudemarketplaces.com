import { NextResponse } from "next/server";
import { readMarketplaces } from "@/lib/crawler/storage";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /api/marketplaces
 * Returns all marketplaces from Vercel Blob or local file
 */
export async function GET() {
  try {
    const marketplaces = await readMarketplaces();

    return NextResponse.json(marketplaces, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching marketplaces:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch marketplaces",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
