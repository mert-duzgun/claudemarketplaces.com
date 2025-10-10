export interface Plugin {
  id: string;
  name: string;
  description: string;
  version?: string;
  author?: {
    name: string;
    email?: string;
  };
  source: string;
  marketplace: string;
  marketplaceUrl: string;
  category: string;
  license?: string;
  keywords?: string[];
  installCommand: string;
}

export interface Marketplace {
  repo: string;
  description: string;
  pluginCount: number;
  categories: string[];
  discoveredAt?: string;
  lastUpdated?: string;
  source?: 'manual' | 'auto';
}
