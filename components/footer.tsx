import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Claude Code Plugins</h3>
            <p className="text-sm text-muted-foreground">
              A marketplace for discovering and sharing Claude Code extensions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://docs.claude.com/en/docs/claude-code/plugins" className="text-muted-foreground hover:text-foreground transition-colors">
                  Plugin Documentation
                </Link>
              </li>
              <li>
                <Link href="https://docs.claude.com/en/docs/claude-code/plugin-marketplaces" className="text-muted-foreground hover:text-foreground transition-colors">
                  Marketplace Guide
                </Link>
              </li>
              <li>
                <Link href="https://github.com/claude-plugins" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub Organization
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                  Submit a Plugin
                </Link>
              </li>
              <li>
                <Link href="https://github.com/claude-plugins/registry" className="text-muted-foreground hover:text-foreground transition-colors">
                  Registry Repository
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Built for the Claude Code community</p>
        </div>
      </div>
    </footer>
  );
}
