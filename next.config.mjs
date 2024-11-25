/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.hauntedhotel-backend-api.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
