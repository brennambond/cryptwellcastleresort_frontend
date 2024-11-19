import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        cormorant: "var(--font-cormorant)",
        unifraktur: "var(--font-unifraktur)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
