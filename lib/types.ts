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
  name: string;
  owner: string;
  description: string;
  repositoryUrl: string;
  pluginCount: number;
}
