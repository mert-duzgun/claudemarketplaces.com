import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PluginGrid } from "@/components/plugin-grid";
import { getAllPlugins, getCategories } from "@/lib/data/plugins";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const plugins = getAllPlugins();
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Discover Claude Code Plugins
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse and install extensions to enhance your Claude Code experience.
              From development tools to productivity boosters, find the perfect plugins for your workflow.
            </p>
          </div>

          <Separator className="mb-12" />

          {/* Plugin Grid with Search and Filters */}
          <PluginGrid plugins={plugins} categories={categories} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
