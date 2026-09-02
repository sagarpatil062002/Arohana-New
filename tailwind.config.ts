import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#FFFFFF",
        surface: "#0D0D0D",
        "card-dark": "#141414",
        "border-dark": "#222222",
        "text-secondary": "#BDBDBD",
        "text-muted": "#777777",
        "light-bg": "#FFFFFF",
        "light-surface": "#F2F2F2",
        "light-border": "#E5E5E5",
        "light-text": "#050505",
        "light-muted": "#666666",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.02em",
        wide: "0.08em",
        wider: "0.15em",
        widest: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
