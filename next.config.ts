import type { NextConfig } from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserOrOrgPagesSite = repositoryName.endsWith('.github.io');
const repoBasePath = isGithubActions && repositoryName && !isUserOrOrgPagesSite ? `/${repositoryName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: repoBasePath,
  assetPrefix: repoBasePath || undefined,
};

export default nextConfig;
