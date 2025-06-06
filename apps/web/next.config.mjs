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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2700, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.turismoderoquetasdemar.es',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [
      {
        source: '/es/edificio-de-usos-multiples-las-marinas',
        destination: '/es-ES/gestion-municipal/edificio-de-usos-multiples-las-marinas',
        permanent: true
      }
    ]
  }
});

export default nextConfig;
