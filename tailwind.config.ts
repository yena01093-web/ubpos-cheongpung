import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // 청풍호의 물빛 — 깊은 수심에서 아침 안개까지
        lake: {
          900: "#0b2f3a",
          800: "#103d4b",
          700: "#17525f",
          600: "#256d78",
          500: "#3a8b93",
          400: "#6aaeb2",
          300: "#9ccbcb",
          200: "#c6e2df",
          100: "#e5f1ee",
        },
        // 세계 각국 테마의 온기 — 흙, 향신료, 석양
        spice: {
          900: "#5c2a15",
          700: "#8f4420",
          600: "#b5592a",
          500: "#c8622f",
          400: "#dd8a4a",
          300: "#e9ae6a",
          200: "#f3d3a8",
        },
        sand: {
          50: "#fdfaf5",
          100: "#f8f2e8",
          200: "#efe4d3",
          300: "#e0cfb6",
          400: "#c9b394",
        },
        ink: {
          900: "#20180f",
          700: "#3d3226",
          500: "#6b5c4b",
          300: "#9c8d7b",
        },
        saffron: "#e0a12c",
      },
      fontFamily: {
        serif: ["var(--font-batang)", "Georgia", "serif"],
        sans: ["var(--font-dodum)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        soft: "0 18px 45px -22px rgba(32, 24, 15, 0.45)",
        lift: "0 28px 60px -28px rgba(11, 47, 58, 0.55)",
      },
      keyframes: {
        driftIn: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-14px)" },
        },
      },
      animation: {
        driftIn: "driftIn 0.9s ease-out both",
        shimmer: "shimmer 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
