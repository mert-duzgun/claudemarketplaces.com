import Link from "next/link";

export function Header() {
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
            <p className="text-lg text-muted-foreground">
              Discover and share Claude Code marketplaces
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
