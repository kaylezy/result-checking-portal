import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ledger: {
          navy: "#1B2A4A",
          navyDeep: "#0F1B33",
          paper: "#FAF7EF",
          paperDim: "#F1EBDC",
          gold: "#C89B3C",
          goldDim: "#A67F2E",
          pass: "#2F5233",
          fail: "#8B2635",
          slate: "#5A6472",
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "ledger-lines":
          "repeating-linear-gradient(transparent, transparent 34px, rgba(27,42,74,0.06) 35px)",
      },
      boxShadow: {
        seal: "0 0 0 3px rgba(200,155,60,0.25), 0 8px 24px -8px rgba(27,42,74,0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
