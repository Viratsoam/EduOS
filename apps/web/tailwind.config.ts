import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18181b",
        mint: "#10b981",
        coral: "#f97316",
      },
    },
  },
  plugins: [],
};

export default config;
