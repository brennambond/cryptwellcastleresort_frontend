/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cryptwellcastleresort-backend.onrender.com",
        pathname: "/media/**", // match all images in /media/
      },
      {
        protocol: "https",
        hostname: "**.vercel.app", // keep this if you're also loading images from Vercel
      },
      {
        protocol: "http",
        hostname: "cryptwellcastleresort-backend.onrender.com",
        pathname: "/media/**", // match all images in /media/
      },
      {
        protocol: "https",
        hostname: "**.vercel.app", // keep this if you're also loading images from Vercel
      },
      {
        protocol: "https",
        hostname: "pkzsqdqeqvjcnubynrxm.supabase.co",
      },
      {
        protocol: "http",
        hostname: "pkzsqdqeqvjcnubynrxm.supabase.co",
      },
    ],
  },
};

export default nextConfig;
