import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // ─── Brand colors ────────────────────────────────────────────────────────
      // Derived from recurring globals.css values so CVA variants can reference
      // semantic names instead of raw Tailwind palette classes.
      colors: {
        brand: {
          DEFAULT: "#3b82f6", // blue-500 — primary CTA, active borders, icons
          light: "#93c5fd",   // blue-300 — table headers, pill outlines
          muted: "#bfdbfe",   // blue-100 — form field backgrounds
          spin: "#2896FF",    // spinner ring accent (design-spec blue)
        },
        surface: {
          base: "#f8fafc",                      // slate-50 — modal / alert bg
          dark: "#1f2937",                      // gray-800 — dark-mode surface
          overlay: "rgb(107 114 128 / 0.75)",   // gray-500/75 — backdrop
        },
        neutral: {
          DEFAULT: "#9ca3af", // gray-400 — muted text, hover state on brand elements
        },
        danger: {
          DEFAULT: "#ef4444", // red-500 — destructive actions
          hover: "#fecaca",   // red-200 — destructive hover
        },
      },

      // ─── Typography ──────────────────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      // ─── Animations ──────────────────────────────────────────────────────────
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