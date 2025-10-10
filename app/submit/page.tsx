import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitFork, GitPullRequest, FileEdit } from "lucide-react";

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Submit Your Plugin
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your Claude Code plugin with the community. Follow these steps to add your plugin to the marketplace.
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                    1
                  </div>
                  <div>
                    <CardTitle>Fork the Registry</CardTitle>
                    <CardDescription>
                      Create your own copy of the claude-plugins/registry repository
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full sm:w-auto">
                  <a
                    href="https://github.com/claude-plugins/registry/fork"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <GitFork className="h-4 w-4" />
                    Fork on GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                    2
                  </div>
                  <div>
                    <CardTitle>Edit marketplace.json</CardTitle>
                    <CardDescription>
                      Add your plugin information to the marketplace file
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Add your plugin entry to the <code className="bg-muted px-2 py-1 rounded">marketplace.json</code> file in your fork:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`{
  "name": "your-plugin-name",
  "description": "Brief description of your plugin",
  "source": "github:yourusername/your-repo",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "category": "development",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"]
}`}</code>
                  </pre>
                  <Button variant="outline" asChild className="w-full sm:w-auto">
                    <a
                      href="https://github.com/claude-plugins/registry/edit/main/.claude-plugin/marketplace.json"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <FileEdit className="h-4 w-4" />
                      Edit File on GitHub
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                    3
                  </div>
                  <div>
                    <CardTitle>Create a Pull Request</CardTitle>
                    <CardDescription>
                      Submit your changes for review
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Once you&apos;ve added your plugin, create a pull request with a clear title and description.
                  </p>
                  <Button asChild className="w-full sm:w-auto">
                    <a
                      href="https://github.com/claude-plugins/registry/compare"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <GitPullRequest className="h-4 w-4" />
                      Create Pull Request
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Plugin Requirements</CardTitle>
              <CardDescription>
                Make sure your plugin meets these criteria before submitting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Valid <code className="bg-muted px-1.5 py-0.5 rounded text-xs">plugin.json</code> manifest file</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Clear description and documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Publicly accessible GitHub repository</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Open source license (MIT, Apache 2.0, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Tested and functional</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Help */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Check out the documentation or reach out to the community
              </p>
              <div className="flex flex-wrap gap-3">
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
                    href="https://github.com/claude-plugins/registry"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Registry Repository
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
