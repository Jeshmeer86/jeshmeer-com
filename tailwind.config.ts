import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#06070A",
        panel: "#0E1116",
        line: "rgba(255,255,255,0.08)",
        text: "#EAF0F6",
        muted: "rgba(234,240,246,0.72)",
        emerald: "#19C37D",
        gold: "#C8A24A",
        goldSoft: "rgba(200,162,74,0.28)",
        platinum: "#D7DEE6",
        platinumSoft: "rgba(215,222,230,0.28)",
        danger: "#FF6B6B",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(0,0,0,0.55)",
      },
    },
  },
  plugins: [],
} satisfies Config;
