import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/copy-button";
import { getPluginById, getAllPlugins } from "@/lib/data/plugins";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

interface PluginPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const plugins = getAllPlugins();
  return plugins.map((plugin) => ({
    id: plugin.id,
  }));
}

export default async function PluginPage({ params }: PluginPageProps) {
  const { id } = await params;
  const plugin = getPluginById(id);

  if (!plugin) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to plugins
            </Link>
          </Button>

          {/* Plugin Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{plugin.name}</h1>
                <p className="text-xl text-muted-foreground">
                  {plugin.description}
                </p>
              </div>
              <Badge className="shrink-0">{plugin.category}</Badge>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {plugin.author && (
                <span>by {plugin.author.name}</span>
              )}
              {plugin.version && (
                <span>• Version {plugin.version}</span>
              )}
              {plugin.license && (
                <span>• {plugin.license}</span>
              )}
            </div>

            {/* Keywords */}
            {plugin.keywords && plugin.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {plugin.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator className="mb-8" />

          {/* Installation Instructions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>
                Copy and paste these commands into Claude Code to install this plugin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Installation Commands</p>
                    <CopyButton text={plugin.installCommand} />
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{plugin.installCommand}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plugin Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Source */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Source</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <a
                    href={plugin.marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-3 break-all">
                  {plugin.source}
                </p>
              </CardContent>
            </Card>

            {/* Marketplace */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium mb-2">{plugin.marketplace}</p>
                <p className="text-sm text-muted-foreground">
                  This plugin is available from the {plugin.marketplace} marketplace
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Documentation Link */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Learn more about installing and using Claude Code plugins
              </p>
              <div className="flex gap-3">
                <Button variant="outline" asChild>
                  <a
                    href="https://docs.claude.com/en/docs/claude-code/plugins"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Plugin Documentation
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://docs.claude.com/en/docs/claude-code/plugin-marketplaces"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Marketplace Guide
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
