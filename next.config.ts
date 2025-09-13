import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://9upg5j2jnh6vltea.public.blob.vercel-storage.com/**')],
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
