import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        member: {
          primary: "#2AFC98",
        },
        partner: {
          primary: "#119DA4",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("theme-member", ".theme-member &");
      addVariant("theme-partner", ".theme-partner &");
    }),
  ],
};

export default config;
