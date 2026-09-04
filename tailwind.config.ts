import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        froxen: {
          bg: "#060607",         // Deep luxury black canvas
          surface: "#0e0e11",    // Dark surface / card background
          surfaceHover: "#16161a",// Card hover
          panel: "#131317",      // Elevated drawer / off-canvas panel
          border: "rgba(255, 255, 255, 0.08)", // Subtle border
          borderLight: "rgba(255, 255, 255, 0.16)",
          lime: "#C6FF00",       // Froxen signature electric chartreuse/lime
          limeHover: "#B5EB00",
          limeGlow: "rgba(198, 255, 0, 0.25)",
          white: "#FFFFFF",
          text: "#ECECEF",       // Crisp off-white primary body
          muted: "#9898A4",      // Secondary text
          subtle: "#5F5F6B",     // Tertiary / metadata text
        },
        brand: {
          lime: "#C6FF00",
          dark: "#060607",
          card: "#0e0e11",
          border: "rgba(255, 255, 255, 0.08)",
          muted: "#9898A4",
        }
      },
      fontFamily: {
        display: [
          '"Big Shoulders Display"',
          '"Big Shoulders"',
          '"Monument Extended"',
          '"Syne"',
          "sans-serif",
        ],
        sans: [
          '"Instrument Sans"',
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"Space Grotesk"',
          "monospace",
        ],
        heading: [
          '"Big Shoulders Display"',
          '"Big Shoulders"',
          "sans-serif",
        ]
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.035em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.2em",
        mono: "0.15em",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
        "pill": "9999px",
      },
      boxShadow: {
        froxen: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        limeGlow: "0 0 40px -5px rgba(198, 255, 0, 0.3)",
        card: "0 4px 30px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "marquee-reverse": "marqueeReverse 40s linear infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        spinSlow: "spin 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.25, 1, 0.5, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
