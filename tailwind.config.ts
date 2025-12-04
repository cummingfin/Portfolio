import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EEE8DE",
        text: "#2B2B2B",
        "section-bg": "#F6F2ED",
        contact: "#C6A177",
      },
      fontFamily: {
        bricolage: ["var(--font-bricolage)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      fontSize: {
        "h1": ["64px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2": ["40px", { lineHeight: "1.3", fontWeight: "500" }],
        "h3": ["28px", { lineHeight: "1.4", fontWeight: "400" }],
        "h4": ["18px", { lineHeight: "1.5", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
export default config;

