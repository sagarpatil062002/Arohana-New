/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/army-projects',
        destination: '/indian-army-projects',
        permanent: true,
      },
      {
        source: '/army-project',
        destination: '/indian-army-projects',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

