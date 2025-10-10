# Claude Code Plugins

A marketplace for discovering and sharing [Claude Code](https://claude.ai/code) extensions.

## Features

- 🔍 **Search & Browse**: Find plugins across all marketplaces with powerful search and filtering
- 🎨 **Claude-Branded**: Beautiful UI with Claude's signature amber/copper colors and typography
- 📦 **Easy Installation**: One-click copy of installation commands
- 🚀 **Static & Fast**: Built with Next.js 15 and Turbopack for blazing-fast performance
- 🌙 **Dark Mode**: Automatic dark mode support

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (package manager)
- Node.js 20+

### Installation

```bash
# Clone the repository
git clone https://github.com/claude-plugins/claudeplugins.com.git
cd claudeplugins.com

# Install dependencies
bun install

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the marketplace.

## Project Structure

```
app/
├── page.tsx              # Home page with plugin grid
├── plugin/[id]/          # Plugin detail pages
├── submit/               # Submit plugin page
├── layout.tsx            # Root layout
└── globals.css           # Global styles

components/
├── header.tsx            # Header with ASCII art logo
├── footer.tsx            # Footer
├── plugin-card.tsx       # Plugin card component
├── plugin-grid.tsx       # Grid with search/filter
└── ui/                   # shadcn/ui components

lib/
├── data/
│   └── plugins.ts        # Plugin data and queries
└── types.ts              # TypeScript types
```

## Adding Plugins

To add your plugin to the marketplace:

1. Fork the [claude-plugins/registry](https://github.com/claude-plugins/registry) repository
2. Edit `.claude-plugin/marketplace.json` to add your plugin
3. Create a pull request

See the [Submit Plugin](https://claudeplugins.com/submit) page for detailed instructions.

## Tech Stack

- **Framework**: Next.js 15 (App Router + Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Package Manager**: Bun
- **Deployment**: Vercel

## Development

```bash
# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Lint code
bun run lint
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT

## Links

- [Website](https://claudeplugins.com)
- [Plugin Registry](https://github.com/claude-plugins/registry)
- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code)
