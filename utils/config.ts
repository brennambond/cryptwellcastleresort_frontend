interface Config {
  bucketDomain: string;
  apiBaseUrl: string;
}

const config: Config = {
  bucketDomain: `https://${
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || "default-bucket"
  }.s3.amazonaws.com`,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
};

export const getImageUrl = (imagePath: string) => {
  // If the path is already a complete URL, return it as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Otherwise, prepend the bucket domain
  return `${config.bucketDomain}/${imagePath}`;
};

export default config;
