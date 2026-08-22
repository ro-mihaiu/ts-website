import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0c0f17",
        surface: {
          50: "#1e2433",
          100: "#181d2a",
          200: "#131722",
          300: "#0f131c",
          DEFAULT: "#131722",
        },
        mc: {
          green: "#2ecc71",
          emerald: "#10b981",
          bedrock: "#e11d48",
          java: "#ea580c",
          cyan: "#06b6d4",
          blue: "#3b82f6",
          purple: "#a855f7",
          gold: "#eab308",
          dark: "#0b0e14",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

