/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1524",
          dark: "#080E18",
          light: "#142036"
        },
        dark: {
          DEFAULT: "#0A0F14",
          surface: "#10161E",
          card: "#121A26"
        },
        slate: {
          DEFAULT: "#1A1F24",
          card: "#18202A",
          border: "#252E3B"
        },
        ivory: {
          DEFAULT: "#F5F2EC",
          card: "#EDE8DF",
          border: "#E0D8CA",
          dark: "#121215"
        },
        brandGray: {
          DEFAULT: "#8A919D",
          light: "#B0B7C3",
          dark: "#5A616C"
        },
        gold: {
          DEFAULT: "#C5A46D",
          light: "#D8BC8A",
          dark: "#A68650"
        },
        brandRed: "#DE322D"
      },
      fontFamily: {
        clash: ["'Clash Display'", "var(--font-clash)", "sans-serif"],
        display: ["'Clash Display'", "var(--font-clash)", "sans-serif"],
        inter: ["'Inter'", "var(--font-inter)", "sans-serif"],
        body: ["'Inter'", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

