/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hauntedhotel-backend-bucket.s3.us-east-1.amazonaws.com", // Corrected hostname
      },
      {
        protocol: "https",
        hostname: "**.vercel.app", // For images hosted on Vercel (optional)
      },
    ],
  },
};

export default nextConfig;
