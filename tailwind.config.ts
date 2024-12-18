/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        green: {
          50: '#f0fdf4',
          500: '#22c55e',
          700: '#15803d'
        },
        red: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c'
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.75',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            'h1, h2, h3': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
}

export default config