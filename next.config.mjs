/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hauntedhotel-backend-bucket.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "hauntedhotel-backend-bucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
  },
};

export default nextConfig;
