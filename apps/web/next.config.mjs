import './src/env/server.mjs';
import './src/env/client.mjs';
import analyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = analyzer({
  enabled: false,
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.turismoderoquetasdemar.es',
      },
    ],
    dangerouslyAllowSVG: true,
  },
});

export default nextConfig;
