import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1B1B16",
          soft: "#242420",
          faint: "#3A3A33",
        },
        paper: {
          DEFAULT: "#FAF6EE",
          dim: "#F1EBDD",
        },
        saffron: {
          DEFAULT: "#E3A008",
          bright: "#F2B90F",
          deep: "#B87F05",
        },
        herb: {
          DEFAULT: "#2F4634",
          light: "#41604A",
          pale: "#DCE6DC",
        },
        brick: {
          DEFAULT: "#8C3B2E",
          light: "#B4523F",
          pale: "#F3DED9",
        },
        stone: {
          DEFAULT: "#8A8578",
          light: "#C7C1B0",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "22px",
        pill: "999px",
        sheet: "28px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(27,27,22,0.06)",
        lift: "0 18px 40px -18px rgba(27,27,22,0.35)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(227,160,8,0.45)" },
          "100%": { boxShadow: "0 0 0 14px rgba(227,160,8,0)" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.6s cubic-bezier(.16,1,.3,1) both",
        "pulse-ring": "pulse-ring 1.6s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
