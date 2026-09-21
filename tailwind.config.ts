import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ivory: "#FDF4EB", gold: "#A68A4A", "gold-deep": "#7A6840", champagne: "#CDB27A" },
      fontFamily: {
        script: ["Asten Script Bold", "Snell Roundhand", "cursive"],
        accent: ["Asten Script Bold", "Snell Roundhand", "cursive"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        arabic: ["var(--font-arabic)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
