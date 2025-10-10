# GitHub Marketplace Crawler

This project includes an automated crawler that discovers Claude Code plugin marketplaces from GitHub every hour.

## How It Works

The crawler:
1. **Searches GitHub** for repositories containing `.claude-plugin/marketplace.json` files
2. **Validates** each marketplace file against the Claude marketplace schema
3. **Checks** that repositories are publicly accessible and plugins have required fields
4. **Merges** discovered marketplaces with existing ones in `lib/data/marketplaces.json`
5. **Runs hourly** via Vercel Cron

## Setup Instructions

### 1. Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a descriptive name: "Claude Marketplaces Crawler"
4. Select scopes:
   - `public_repo` (for accessing public repositories)
5. Click "Generate token" and copy it

### 2. Set Environment Variables

#### Local Development

Create a `.env.local` file:

```bash
# Required: GitHub token for API access
GITHUB_TOKEN=ghp_your_actual_github_token_here

# Required: Secret for protecting cron endpoint
# Generate with: openssl rand -base64 32
CRON_SECRET=your_random_secret_here

# Optional: Vercel Blob token (auto-provided by Vercel in production)
# BLOB_READ_WRITE_TOKEN=vercel_blob_token_here
```

#### Production (Vercel)

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token (mark as **secret**)
   - `CRON_SECRET`: A random secret string (mark as **secret**)
   - `BLOB_READ_WRITE_TOKEN`: Auto-provided by Vercel Blob (if using)

### 3. Deploy to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy
vercel

# Or connect via GitHub and push to main branch
git push origin main
```

The cron job will automatically start running hourly once deployed.

## Manual Trigger

You can manually trigger the crawler by making a POST request:

```bash
curl -X POST https://your-domain.vercel.app/api/crawl \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## API Response

The crawler endpoint returns JSON with detailed statistics:

```json
{
  "success": true,
  "discovered": 15,
  "fetched": 12,
  "validated": 10,
  "added": 3,
  "updated": 7,
  "total": 20,
  "failed": 2,
  "errors": [...],
  "duration": 5234,
  "timestamp": "2025-10-10T12:00:00.000Z"
}
```

## Architecture

```
┌─────────────────────────────────────────┐
│      Vercel Cron (Hourly Trigger)       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      /api/crawl (API Route)              │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
┌────────────┐  ┌────────────┐
│  GitHub    │  │ Validator  │
│  Search    │  │  Service   │
└────────────┘  └────────────┘
        │             │
        └──────┬──────┘
               ▼
      ┌────────────────┐
      │    Storage     │
      │    Service     │
      └────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
┌─────────────┐ ┌─────────────┐
│ Vercel Blob │ │ Local JSON  │
│  (Runtime)  │ │  (Builds)   │
└─────────────┘ └─────────────┘
```

## Files Structure

```
lib/
├── crawler/
│   ├── github-search.ts    # GitHub API integration
│   ├── validator.ts        # Marketplace validation logic
│   └── storage.ts          # Data persistence (Blob + JSON)
├── schemas/
│   └── marketplace.schema.ts  # Zod validation schemas
└── types.ts                # Updated with metadata fields

app/api/crawl/
└── route.ts                # Main crawler endpoint

vercel.json                 # Cron configuration
```

## Validation Rules

The crawler validates:

1. **JSON Structure**: Valid JSON format
2. **Schema Compliance**: Matches Claude marketplace.json schema
   - Required: `name`, `owner`, `plugins` array
   - Each plugin must have: `id`, `name`, `source`
3. **Repository Access**: Repo is publicly accessible on GitHub
4. **Plugin Fields**: All plugins have required fields

## Metadata Tracking

Each discovered marketplace includes:

```typescript
{
  repo: string;           // "owner/repo"
  description: string;    // From marketplace or repo
  pluginCount: number;    // Number of plugins
  categories: string[];   // Extracted from plugins
  discoveredAt?: string;  // ISO timestamp of first discovery
  lastUpdated?: string;   // ISO timestamp of last check
  source?: 'manual' | 'auto';  // Discovery source
}
```

## Rate Limits

- **GitHub Code Search API**: 30 requests/minute
- **GitHub REST API**: 5,000 requests/hour (authenticated)

The crawler is designed to stay well under these limits with hourly runs.

## Troubleshooting

### Crawler not running

Check Vercel logs:
```bash
vercel logs --follow
```

### Missing GITHUB_TOKEN error

Ensure the environment variable is set in Vercel project settings.

### Validation failures

Check the API response `errors` array for specific validation issues.

### Build failing locally

Set a dummy token for builds:
```bash
GITHUB_TOKEN=dummy bun run build
```

## Future Enhancements

- [ ] Search functionality for discovered marketplaces
- [ ] Admin dashboard for manual approval
- [ ] Webhook notifications for new discoveries
- [ ] Plugin health scoring
- [ ] Duplicate marketplace detection
- [ ] Incremental crawling (only check updated repos)
