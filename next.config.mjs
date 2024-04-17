/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
