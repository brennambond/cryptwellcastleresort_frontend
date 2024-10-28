import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-main": "#edeffb",
        "blue-main": "#4ea0ae",
        "purple-main": "#6c53a4",
        "green-main": "#077f51",
        "black-main": "#040000",
      },
    },
  },
  plugins: [],
};
export default config;
