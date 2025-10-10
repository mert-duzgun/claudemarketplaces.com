import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Claude Code Marketplaces</h3>
            <p className="text-sm text-muted-foreground">
              A directory for discovering plugin marketplaces for Claude Code. Browse curated collections from official sources and the community.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://docs.claude.com/en/docs/claude-code/plugin-marketplaces#marketplace-schema" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  Plugin Marketplaces
                </a>
              </li>
              <li>
                <a href="https://www.anthropic.com/news/claude-code-plugins" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  Announcement (Blog)
                </a>
              </li>
              <li>
                <a href="https://x.com/AnthropicAI/status/1878133858093199712" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  Announcement (X)
                </a>
              </li>
              <li>
                <a href="https://docs.claude.com/en/docs/claude-code/plugins-reference" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  Plugins Reference
                </a>
              </li>
              <li>
                <a href="https://github.com/mert-duzgun/claudemarketplaces.com" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="https://github.com/mert-duzgun/claudemarketplaces.com" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  Star on GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/mert-duzgun/claudemarketplaces.com/issues" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Built for the Claude Code community with Claude Code</p>
        </div>
      </div>
    </footer>
  );
}
