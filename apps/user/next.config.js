/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui"],
    images: {
    domains: ["img.freepik.com"], 
  },
};

export default nextConfig;
