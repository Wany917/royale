// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          layout: {}, // keep default layout tokens
          colors: {
            background: "#0A0F1C",
            foreground: "#E2E8F0",
            primary: {
              50: "#E6F3FF",
              100: "#CCE7FF",
              200: "#99CEFF",
              300: "#66B5FF",
              400: "#339CFF",
              500: "#0083FF",  // Base primary color
              600: "#0069CC",
              700: "#004F99",
              800: "#003566",
              900: "#001A33",
              DEFAULT: "#0083FF",
              foreground: "#FFFFFF",
            },
            focus: "#0083FF",
            secondary: {
              50: "#E9F5FF",
              100: "#C3E2FF",
              200: "#9CCFFF",
              300: "#76BCFF",
              400: "#4FA9FF",
              500: "#2996FF",  // Base secondary color
              600: "#2178CC",
              700: "#195A99",
              800: "#113C66",
              900: "#081E33",
              DEFAULT: "#2996FF",
              foreground: "#FFFFFF",
            },
            default: {
              50: "#1A2333",
              100: "#232D40",
              200: "#2B374D",
              300: "#34415A",
              400: "#3D4B67",
              500: "#465574",
              600: "#516281",
              700: "#5C6F8E",
              800: "#677C9B",
              900: "#7289A8",
              DEFAULT: "#465574",
              foreground: "#FFFFFF",
            },
            divider: "#1F2937",
            overlay: "#0A0F1C99",
            content1: "#0F172A",
            content2: "#1E293B",
            content3: "#2D3B4F",
            content4: "#3D4B63",
          }
        },
        light: {
          layout: {}, // keep default layout tokens
          colors: {
            background: "#F8FAFC",
            foreground: "#0F172A",
            primary: {
              50: "#E6F3FF",
              100: "#CCE7FF",
              200: "#99CEFF",
              300: "#66B5FF",
              400: "#339CFF",
              500: "#0083FF",  // Base primary color
              600: "#0069CC",
              700: "#004F99",
              800: "#003566",
              900: "#001A33",
              DEFAULT: "#0083FF",
              foreground: "#FFFFFF",
            },
            focus: "#0083FF",
            secondary: {
              50: "#E9F5FF",
              100: "#C3E2FF",
              200: "#9CCFFF",
              300: "#76BCFF",
              400: "#4FA9FF",
              500: "#2996FF",  // Base secondary color
              600: "#2178CC",
              700: "#195A99",
              800: "#113C66",
              900: "#081E33",
              DEFAULT: "#2996FF",
              foreground: "#FFFFFF",
            },
            default: {
              50: "#F8FAFC",
              100: "#F1F5F9",
              200: "#E2E8F0",
              300: "#CBD5E1",
              400: "#94A3B8",
              500: "#64748B",
              600: "#475569",
              700: "#334155",
              800: "#1E293B",
              900: "#0F172A",
              DEFAULT: "#64748B",
              foreground: "#0F172A",
            },
            divider: "#E2E8F0",
            content1: "#FFFFFF",
            content2: "#F8FAFC",
            content3: "#F1F5F9",
            content4: "#E2E8F0",
          }
        }
      }
    }),
  ],
}