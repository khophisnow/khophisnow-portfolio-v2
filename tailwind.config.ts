import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050807",
        panel: "#0b1110",
        line: "#16352d",
        mint: "#57f29a",
        cyan: "#53d8fb",
        amber: "#f5c451",
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        sans: ["var(--font-sans)"],
      },
      boxShadow: {
        terminal: "0 0 0 1px rgba(87, 242, 154, 0.18), 0 24px 80px rgba(0, 0, 0, 0.42)",
      },
    },
  },
  plugins: [],
};

export default config;
