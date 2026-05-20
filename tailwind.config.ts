import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "var(--color-text-primary)",
          title: "var(--color-text-title)",
          paragraph: "var(--color-text-paragraph)",
          description: "var(--color-text-description)",
        },
        background: {
          full: "var(--color-background-full)",
          card: "var(--color-background-card)",
          hover: "var(--color-background-hover)",
          focus: "var(--color-background-focus)",
        },
        scrollbar: {
          track: "var(--color-scrollbar-track)",
          thumb: "var(--color-scrollbar-thumb)",
        },
        info: {
          text: "var(--color-info-text)",
          background: "var(--color-info-background)",
        },
        warn: {
          text: "var(--color-warn-text)",
          background: "var(--color-warn-background)",
        },
        success: {
          text: "var(--color-success-text)",
          background: "var(--color-success-background)",
        },
        error: {
          text: "var(--color-error-text)",
          background: "var(--color-error-background)",
        },
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
        serif: "var(--font-serif)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
};

export default config;
