import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(400px)", opacity: "0" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0px)", opacity: "1" },
          "100%": { transform: "translateX(-200px)", opacity: "0" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "slide-out": "slide-out 0.5s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;