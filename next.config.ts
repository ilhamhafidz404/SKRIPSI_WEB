/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.bestbuy.ca",
      },
    ],
  },
};

export default nextConfig;
