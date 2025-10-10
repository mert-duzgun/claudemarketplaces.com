import { Plugin, Marketplace } from "@/lib/types";

export const marketplaces: Marketplace[] = [
  {
    name: "claude-code-plugins",
    owner: "Anthropic",
    description: "Official Anthropic plugins for Claude Code",
    repositoryUrl: "https://github.com/anthropics/claude-code",
    pluginCount: 4,
  },
  {
    name: "claude-code-templates",
    owner: "Daniel Avila",
    description: "Community templates and workflows",
    repositoryUrl: "https://github.com/davila7/claude-code-templates",
    pluginCount: 8,
  },
];

export const plugins: Plugin[] = [
  // Anthropic Official Plugins
  {
    id: "agent-sdk-dev",
    name: "agent-sdk-dev",
    description: "Development kit for working with the Claude Agent SDK",
    version: "1.0.0",
    author: {
      name: "Anthropic",
      email: "support@anthropic.com",
    },
    source: "github:anthropics/claude-code/plugins/agent-sdk-dev",
    marketplace: "claude-code-plugins",
    marketplaceUrl: "https://github.com/anthropics/claude-code",
    category: "development",
    installCommand: "/plugin marketplace add anthropics/claude-code\n/plugin install agent-sdk-dev@claude-code-plugins",
  },
  {
    id: "pr-review-toolkit",
    name: "pr-review-toolkit",
    description: "Comprehensive PR review agents specializing in comments, tests, error handling, type design, code quality, and code simplification",
    version: "1.0.0",
    author: {
      name: "Anthropic",
      email: "support@anthropic.com",
    },
    source: "github:anthropics/claude-code/plugins/pr-review-toolkit",
    marketplace: "claude-code-plugins",
    marketplaceUrl: "https://github.com/anthropics/claude-code",
    category: "productivity",
    installCommand: "/plugin marketplace add anthropics/claude-code\n/plugin install pr-review-toolkit@claude-code-plugins",
  },
  {
    id: "commit-commands",
    name: "commit-commands",
    description: "Commands for git commit workflows including commit, push, and PR creation",
    version: "1.0.0",
    author: {
      name: "Anthropic",
      email: "support@anthropic.com",
    },
    source: "github:anthropics/claude-code/plugins/commit-commands",
    marketplace: "claude-code-plugins",
    marketplaceUrl: "https://github.com/anthropics/claude-code",
    category: "productivity",
    installCommand: "/plugin marketplace add anthropics/claude-code\n/plugin install commit-commands@claude-code-plugins",
  },
  {
    id: "feature-dev",
    name: "feature-dev",
    description: "Comprehensive feature development workflow with specialized agents for codebase exploration, architecture design, and quality review",
    version: "1.0.0",
    author: {
      name: "Siddharth Bidasaria",
      email: "sbidasaria@anthropic.com",
    },
    source: "github:anthropics/claude-code/plugins/feature-dev",
    marketplace: "claude-code-plugins",
    marketplaceUrl: "https://github.com/anthropics/claude-code",
    category: "development",
    installCommand: "/plugin marketplace add anthropics/claude-code\n/plugin install feature-dev@claude-code-plugins",
  },
  // Community Plugins
  {
    id: "git-workflow",
    name: "git-workflow",
    description: "Git workflow automation: feature, release, and hotfix commands with git specialists",
    version: "1.0.0",
    author: {
      name: "Daniel Avila",
    },
    source: "github:davila7/claude-code-templates",
    marketplace: "claude-code-templates",
    marketplaceUrl: "https://github.com/davila7/claude-code-templates",
    category: "productivity",
    license: "MIT",
    keywords: ["git", "workflow", "automation"],
    installCommand: "/plugin marketplace add davila7/claude-code-templates\n/plugin install git-workflow@claude-code-templates",
  },
  {
    id: "supabase-toolkit",
    name: "supabase-toolkit",
    description: "Complete Supabase workflow with specialized commands, data engineering agents, and MCP integrations",
    version: "1.0.0",
    author: {
      name: "Daniel Avila",
    },
    source: "github:davila7/claude-code-templates",
    marketplace: "claude-code-templates",
    marketplaceUrl: "https://github.com/davila7/claude-code-templates",
    category: "development",
    license: "MIT",
    keywords: ["supabase", "database", "postgresql", "data"],
    installCommand: "/plugin marketplace add davila7/claude-code-templates\n/plugin install supabase-toolkit@claude-code-templates",
  },
  {
    id: "nextjs-vercel-pro",
    name: "nextjs-vercel-pro",
    description: "Complete Next.js and Vercel development toolkit with deployment automation and performance optimization",
    version: "1.0.0",
    author: {
      name: "Daniel Avila",
    },
    source: "github:davila7/claude-code-templates",
    marketplace: "claude-code-templates",
    marketplaceUrl: "https://github.com/davila7/claude-code-templates",
    category: "development",
    license: "MIT",
    keywords: ["nextjs", "vercel", "react", "deployment", "performance"],
    installCommand: "/plugin marketplace add davila7/claude-code-templates\n/plugin install nextjs-vercel-pro@claude-code-templates",
  },
  {
    id: "testing-suite",
    name: "testing-suite",
    description: "Comprehensive testing toolkit with E2E, unit, integration, and visual testing automation",
    version: "1.0.0",
    author: {
      name: "Daniel Avila",
    },
    source: "github:davila7/claude-code-templates",
    marketplace: "claude-code-templates",
    marketplaceUrl: "https://github.com/davila7/claude-code-templates",
    category: "testing",
    license: "MIT",
    keywords: ["testing", "qa", "e2e", "automation", "quality"],
    installCommand: "/plugin marketplace add davila7/claude-code-templates\n/plugin install testing-suite@claude-code-templates",
  },
  {
    id: "security-pro",
    name: "security-pro",
    description: "Enterprise security toolkit with auditing, penetration testing, and compliance automation",
    version: "1.0.0",
    author: {
      name: "Daniel Avila",
    },
    source: "github:davila7/claude-code-templates",
    marketplace: "claude-code-templates",
    marketplaceUrl: "https://github.com/davila7/claude-code-templates",
    category: "security",
    license: "MIT",
    keywords: ["security", "audit", "compliance", "pentesting", "vulnerability"],
    installCommand: "/plugin marketplace add davila7/claude-code-templates\n/plugin install security-pro@claude-code-templates",
  },
  {
    id: "ai-ml-toolkit",
    name: "ai-ml-toolkit",
    description: "AI and Machine Learning development suite with data engineering and model deployment tools",
    version: "1.0.0",
    author: {
      name: "Daniel Avila",
    },
    source: "github:davila7/claude-code-templates",
    marketplace: "claude-code-templates",
    marketplaceUrl: "https://github.com/davila7/claude-code-templates",
    category: "ai-ml",
    license: "MIT",
    keywords: ["ai", "ml", "machine-learning", "data-science", "nlp"],
    installCommand: "/plugin marketplace add davila7/claude-code-templates\n/plugin install ai-ml-toolkit@claude-code-templates",
  },
  {
    id: "devops-automation",
    name: "devops-automation",
    description: "DevOps automation suite with CI/CD, infrastructure management, and deployment orchestration",
    version: "1.0.0",
    author: {
      name: "Daniel Avila",
    },
    source: "github:davila7/claude-code-templates",
    marketplace: "claude-code-templates",
    marketplaceUrl: "https://github.com/davila7/claude-code-templates",
    category: "devops",
    license: "MIT",
    keywords: ["devops", "cicd", "infrastructure", "deployment", "automation"],
    installCommand: "/plugin marketplace add davila7/claude-code-templates\n/plugin install devops-automation@claude-code-templates",
  },
  {
    id: "documentation-generator",
    name: "documentation-generator",
    description: "Automated documentation generation with API docs, technical writing, and content management",
    version: "1.0.0",
    author: {
      name: "Daniel Avila",
    },
    source: "github:davila7/claude-code-templates",
    marketplace: "claude-code-templates",
    marketplaceUrl: "https://github.com/davila7/claude-code-templates",
    category: "documentation",
    license: "MIT",
    keywords: ["documentation", "api-docs", "technical-writing", "content"],
    installCommand: "/plugin marketplace add davila7/claude-code-templates\n/plugin install documentation-generator@claude-code-templates",
  },
];

export function getAllPlugins(): Plugin[] {
  return plugins;
}

export function getPluginById(id: string): Plugin | undefined {
  return plugins.find((p) => p.id === id);
}

export function getPluginsByCategory(category: string): Plugin[] {
  return plugins.filter((p) => p.category === category);
}

export function searchPlugins(query: string): Plugin[] {
  const lowerQuery = query.toLowerCase();
  return plugins.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.keywords?.some((k) => k.toLowerCase().includes(lowerQuery))
  );
}

export function getCategories(): string[] {
  const categories = new Set(plugins.map((p) => p.category));
  return Array.from(categories).sort();
}
