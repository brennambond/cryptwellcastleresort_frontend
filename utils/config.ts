interface Config {
  mediaBaseUrl: string;
  apiBaseUrl: string;
}

const config: Config = {
  mediaBaseUrl:
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "http://localhost:8000/media",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
};

export const getImageUrl = (imagePath: string) => {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return `${config.mediaBaseUrl}/${imagePath}`;
};

export default config;
