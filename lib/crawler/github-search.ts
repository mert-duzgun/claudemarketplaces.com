import { Octokit } from "@octokit/rest";

function getOctokit() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN environment variable is required");
  }

  return new Octokit({
    auth: GITHUB_TOKEN,
  });
}

export interface GitHubSearchResult {
  repo: string;
  path: string;
  url: string;
}

/**
 * Search GitHub for .claude-plugin/marketplace.json files
 * Uses GitHub Code Search API
 */
export async function searchMarketplaceFiles(): Promise<GitHubSearchResult[]> {
  try {
    const octokit = getOctokit();

    // Search for marketplace.json files in the .claude-plugin directory
    const query = "filename:marketplace.json path:.claude-plugin";

    const response = await octokit.rest.search.code({
      q: query,
      per_page: 100, // Max results per page
    });

    const results: GitHubSearchResult[] = response.data.items.map((item) => ({
      repo: item.repository.full_name,
      path: item.path,
      url: item.html_url,
    }));

    console.log(`Found ${results.length} marketplace files on GitHub`);

    return results;
  } catch (error) {
    if (error instanceof Error) {
      console.error("GitHub search failed:", error.message);

      // Handle rate limiting
      if ('status' in error && error.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Try again later.");
      }
    }
    throw error;
  }
}

/**
 * Fetch raw content of marketplace.json file from GitHub
 */
export async function fetchMarketplaceFile(
  repo: string,
  branch: string = "main"
): Promise<string> {
  try {
    const octokit = getOctokit();
    const [owner, repoName] = repo.split("/");

    const response = await octokit.rest.repos.getContent({
      owner,
      repo: repoName,
      path: ".claude-plugin/marketplace.json",
      ref: branch,
    });

    // Handle the response which can be a file, directory, or symlink
    if ("content" in response.data && response.data.type === "file") {
      // Content is base64 encoded
      const content = Buffer.from(response.data.content, "base64").toString(
        "utf-8"
      );
      return content;
    }

    throw new Error("marketplace.json is not a file");
  } catch (error) {
    // Try 'master' branch if 'main' fails
    if (branch === "main") {
      try {
        return await fetchMarketplaceFile(repo, "master");
      } catch {
        throw new Error(`Could not fetch marketplace.json from ${repo}`);
      }
    }
    throw error;
  }
}

/**
 * Check if a GitHub repository is publicly accessible
 */
export async function isRepoAccessible(repo: string): Promise<boolean> {
  try {
    const octokit = getOctokit();
    const [owner, repoName] = repo.split("/");

    await octokit.rest.repos.get({
      owner,
      repo: repoName,
    });

    return true;
  } catch (error) {
    console.error(`Repo ${repo} is not accessible:`, error);
    return false;
  }
}

/**
 * Get repository description from GitHub
 */
export async function getRepoDescription(repo: string): Promise<string> {
  try {
    const octokit = getOctokit();
    const [owner, repoName] = repo.split("/");

    const response = await octokit.rest.repos.get({
      owner,
      repo: repoName,
    });

    return response.data.description || "";
  } catch {
    console.error(`Could not get description for ${repo}`);
    return "";
  }
}
