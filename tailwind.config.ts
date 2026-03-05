import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MERK — Rich purple (trust, premium) — afgeleid van logo
        primary: {
          DEFAULT: "#583A85",
          hover: "#462D6B",
          light: "#F5F0FA",
          dark: "#351F54",
          50: "#F5F0FA",
          100: "#EBE1F5",
          200: "#D4BFE9",
          300: "#B894D8",
          400: "#9A6BBF",
          500: "#7B4FA6",
          600: "#6A3F96",
          700: "#583A85",
          800: "#462D6B",
          900: "#351F54",
        },
        // ACCENT — Coral (warmth, energy, action) — afgeleid van logo
        accent: {
          DEFAULT: "#E8524A",
          hover: "#D4403A",
          light: "#FEF2F1",
          dark: "#8E2823",
          50: "#FEF2F1",
          100: "#FDE3E1",
          200: "#FBC5C2",
          300: "#F79B96",
          400: "#F26157",
          500: "#E8524A",
          600: "#E8524A",
          700: "#D4403A",
          800: "#8E2823",
        },
        // TEKST
        dark: "#251938",
        muted: "#4B5563",
        subtle: "#78716C",
        // ACHTERGROND
        page: "#FAF9F6",
        warm: "#FBF8F3",
        // BORDERS
        border: {
          DEFAULT: "#E5E7EB",
          light: "#F3F4F6",
        },
        // Grays — Neutral warmth (not cold slate)
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', "Inter", "-apple-system", "system-ui", "sans-serif"],
        mono: ['var(--font-heading)', "Plus Jakarta Sans", "system-ui", "sans-serif"],
        heading: ['var(--font-heading)', "Plus Jakarta Sans", "-apple-system", "system-ui", "sans-serif"],
        body: ['var(--font-sans)', "Inter", "-apple-system", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.25rem", { lineHeight: "1.4" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["2rem", { lineHeight: "1.15" }],
        "4xl": ["2.75rem", { lineHeight: "1.08" }],
        "5xl": ["3.5rem", { lineHeight: "1.05" }],
        // Design system tokens
        "display-xl": ["3.75rem", { lineHeight: "1.03", letterSpacing: "-0.035em" }],
        display: ["2.625rem", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "heading-1": ["2.125rem", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
        "heading-2": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "heading-3": ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        body: ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 32px -8px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.04)",
        md: "0 4px 12px -2px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        lg: "0 12px 32px -8px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.04)",
        "card-lg": "0 12px 32px -8px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.04)",
        xl: "0 24px 48px -12px rgba(0,0,0,0.15)",
        soft: "0 2px 16px rgba(0,0,0,0.06)",
        "inner-sm": "inset 0 1px 2px rgba(0,0,0,0.06)",
        glow: "0 8px 24px -4px rgba(88,58,133,0.15)",
        "glow-accent": "0 8px 24px -4px rgba(232,82,74,0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16,1,0.3,1)",
        "slide-down": "slideDown 0.3s cubic-bezier(0.16,1,0.3,1)",
        "scale-in": "scaleIn 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      spacing: {
        section: "6rem",
        18: "4.5rem",
        22: "5.5rem",
      },
      maxWidth: {
        content: "76rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
