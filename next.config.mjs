/** @type {import('next').NextConfig} */
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
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
      {
        //todo: remove via placeholder.com
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
      },
    ],
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
