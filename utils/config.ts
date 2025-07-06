interface Config {
<<<<<<< HEAD
  bucketDomain: string;
=======
  mediaBaseUrl: string;
>>>>>>> ca66d22 (Finalize frontend changes to support new backend and Supabase images)
  apiBaseUrl: string;
}

const config: Config = {
<<<<<<< HEAD
  bucketDomain: `https://${
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || "default-bucket"
  }.s3.amazonaws.com`,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
=======
  mediaBaseUrl:
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "http://localhost:8000/media",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
>>>>>>> ca66d22 (Finalize frontend changes to support new backend and Supabase images)
};

export const getImageUrl = (imagePath: string) => {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

<<<<<<< HEAD
  return `${config.bucketDomain}/${imagePath}`;
=======
  return `${config.mediaBaseUrl}/${imagePath}`;
>>>>>>> ca66d22 (Finalize frontend changes to support new backend and Supabase images)
};

export default config;
