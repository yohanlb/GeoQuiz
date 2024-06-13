/** @type {import('next').NextConfig} */
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adwhviervvdqnbswunen.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ];
  },
  skipTrailingSlashRedirect: true,

  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
});
