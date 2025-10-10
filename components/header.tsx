import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          {/* ASCII Art Logo - Generated with oh-my-logo */}
          <Link href="/" className="group">
            <pre className="text-primary font-mono text-[10px] sm:text-xs leading-tight select-none transition-opacity hover:opacity-80 overflow-x-auto">
{`____ _        _   _   _ ____  _____    ____ ___  ____  _____
/ ___| |      / \\ | | | |  _ \\| ____|  / ___/ _ \\|  _ \\| ____|
| |   | |     / _ \\| | | | | | |  _|   | |  | | | | | | |  _|
| |___| |___ / ___ \\ |_| | |_| | |___  | |__| |_| | |_| | |___
\\____|_____/_/   \\_\\___/|____/|_____|  \\____\\___/|____/|_____|
|  _ \\| |  | | | |/ ___|_ _| \\ | / ___|
| |_) | |  | | | | |  _ | ||  \\| \\___ \\
|  __/| |__| |_| | |_| || || |\\  |___) |
|_|   |_____\\___/ \\____|___|_| \\_|____/`}
            </pre>
          </Link>

          {/* Tagline and Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-muted-foreground text-sm">
              Discover and share Claude Code plugins
            </p>
            <nav className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link href="/">Browse</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/submit">Submit Plugin</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
