/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["hauntedhotel-backend-bucket.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**hauntedhotel-backend-bucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
  },
};

export default nextConfig;
