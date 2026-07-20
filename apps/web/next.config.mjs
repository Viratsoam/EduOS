/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@eduos/sdk", "@eduos/types", "@eduos/ui"],
};

export default nextConfig;
