# Crawler Scripts

This directory contains standalone scripts for managing the Claude Code marketplaces database.

## 📦 Available Scripts

### `crawl.ts` - Marketplace Crawler

Standalone script for discovering and validating Claude Code marketplaces from GitHub.

## 🚀 Usage

### Run Full Crawler
```bash
bun run crawl
```
Discovers all marketplaces on GitHub, validates them, fetches star counts, and saves to local database. Automatically removes marketplaces that fail validation to maintain database integrity.

### Test with Limited Results
```bash
bun run crawl:test
# Equivalent to: bun run scripts/crawl.ts --limit 10
```
Tests the crawler with only the first 10 repositories for faster development/testing.

### Dry Run (Preview Mode)
```bash
bun run crawl:dry
# Equivalent to: bun run scripts/crawl.ts --dry-run
```
Runs the entire validation process but doesn't save results. Great for testing validation rules.

### Custom Options
```bash
# Limit to first 20 repos
bun run scripts/crawl.ts --limit 20

# Dry run with verbose logging
bun run scripts/crawl.ts --dry-run --verbose

# Show help
bun run scripts/crawl.ts --help
```

## 📋 CLI Options

| Option | Short | Description |
|--------|-------|-------------|
| `--limit N` | - | Limit results to first N repositories |
| `--dry-run` | - | Run validation without saving results |
| `--verbose` | `-v` | Show detailed logging including errors |
| `--help` | `-h` | Show help message |

## 🔧 Requirements

- **Environment Variables**: `GITHUB_TOKEN` must be set in `.env.local`
- **Permissions**: GitHub token needs public repo read access
- **Storage**: Writes to `lib/data/marketplaces.json` in development

## 📊 Output

The crawler provides:
- ✅ Color-coded progress indicators
- 📊 Summary statistics (discovered, validated, added, updated, removed)
- ⭐ Star counts for each marketplace
- ⏱️ Execution time and success rate
- ❌ Validation errors (with `--verbose`)
- 🧹 Automatic cleanup of invalid marketplaces

## 🎯 Example Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Claude Code Marketplaces Crawler
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1/6] Searching GitHub for marketplace files...
  ✅ Found 59 potential marketplaces

[2/6] Fetching marketplace.json files...
  ✅ Fetched 10/10 files

[3/6] Validating with Zod v4 schema...
  ✅ Valid: 10/10

[4/6] Fetching GitHub star counts...
  ✅ Fetched stars for 10/10 repos

[5/6] Marketplace Summary
  1. anthropics/claude-code - 5 plugins - ⭐ 36146
  2. wshobson/agents - 27 plugins - ⭐ 15606
  ...

[6/6] Saving to database...
  ✅ Added: 0 marketplaces
  ✅ Updated: 10 marketplaces
  ⚠️  Removed: 4 invalid marketplaces
  ✅ Total: 46 marketplaces

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Crawl Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⏱️  Duration: 2.33s
  📊 Success Rate: 100.0%
  💾 Data saved to lib/data/marketplaces.json
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🧹 Database Integrity

The crawler automatically maintains database integrity by removing marketplaces that become invalid:

- **What gets removed**: Marketplaces that were previously discovered but now fail validation
- **Why removal happens**:
  - Schema changes in the marketplace.json file
  - Files deleted or made private
  - Validation rule updates
  - Invalid JSON or missing required fields
- **Safety**: Only removes discovered repos that fail validation, never removes marketplaces not found by GitHub search

When a marketplace is removed, you'll see a warning in the output:
```
⚠️  Removed: 4 invalid marketplaces
```

## 🐛 Troubleshooting

### "GITHUB_TOKEN environment variable is required"
Make sure you have a `.env.local` file with a valid GitHub token:
```bash
GITHUB_TOKEN=github_pat_xxxxxxxxxxxxx
```

### Rate Limit Errors
The GitHub API has rate limits. If you hit them:
- Wait an hour for the limit to reset
- Use `--limit N` to fetch fewer results
- Check your token's rate limit status at https://github.com/settings/tokens

### Validation Errors
Use `--verbose` to see detailed validation errors:
```bash
bun run scripts/crawl.ts --verbose
```

## 🔄 Development Workflow

1. **Test changes**: `bun run crawl:test`
2. **Preview results**: `bun run crawl:dry --limit 5`
3. **Run full crawl**: `bun run crawl`
4. **Debug issues**: `bun run scripts/crawl.ts --verbose --limit 3`
