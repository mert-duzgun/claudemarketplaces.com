import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MarketplaceGrid } from "@/components/marketplace-grid";
import { getAllMarketplaces, getCategories } from "@/lib/data/marketplaces";

export default function Home() {
  const marketplaces = getAllMarketplaces();
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Marketplace Grid with Search and Filters */}
          <MarketplaceGrid
            marketplaces={marketplaces}
            categories={categories}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
