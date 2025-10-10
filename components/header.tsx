import Link from "next/link";

interface HeaderProps {
  subtitle?: string;
  showAboutLink?: boolean;
}

export function Header({
  subtitle = "A comprehensive directory for discovering plugin marketplaces",
  showAboutLink = true,
}: HeaderProps) {
  return (
    <header>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="text-lg sm:text-4xl md:text-5xl font-[family-name:var(--font-bbh-sans)] font-normal text-primary tracking-wide transition-opacity hover:opacity-80 pt-10">
              CLAUDE CODE MARKETPLACES
            </h1>
          </Link>

          {/* Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-lg text-muted-foreground">{subtitle}</p>
            {showAboutLink && (
              <Link
                href="/about"
                className="text-sm text-primary hover:underline whitespace-nowrap"
              >
                How does this work?
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
