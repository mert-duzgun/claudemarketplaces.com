import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllMarketplaces, getCategories } from "@/lib/data/marketplaces";
import { MarketplaceContent } from "@/components/marketplace-content";

async function MarketplaceData() {
  const [marketplaces, categories] = await Promise.all([
    getAllMarketplaces(),
    getCategories(),
  ]);

  return <MarketplaceContent marketplaces={marketplaces} categories={categories} />;
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-8">
              <div className="animate-pulse space-y-6">
                <div className="h-9 bg-muted rounded-md" />
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-7 w-20 bg-muted rounded-md" />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-muted rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <MarketplaceData />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
