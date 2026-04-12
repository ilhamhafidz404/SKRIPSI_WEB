/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.bestbuy.ca",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
    ],
  },
  session: {
    strategy: "jwt",
  },
};

export default nextConfig;
