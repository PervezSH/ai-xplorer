/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/compare",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
