/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
<<<<<<< HEAD
        hostname: "hauntedhotel-backend-bucket.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "hauntedhotel-backend-bucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
=======
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
        hostname: "qvnsaopoeydtfrjwrudb.supabase.co",
      },
      {
        protocol: "http",
        hostname: "qvnsaopoeydtfrjwrudb.supabase.co",
>>>>>>> ca66d22 (Finalize frontend changes to support new backend and Supabase images)
      },
    ],
  },
};

export default nextConfig;
