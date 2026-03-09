import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        forest: {
          DEFAULT: '#1B4332',
          light: '#2D6A4F',
        },
        sage: {
          DEFAULT: '#52796F',
          light: '#74A69D',
        },
        mint: {
          DEFAULT: '#95D5B2',
          light: '#B7E4C7',
        },
        cream: '#FAFDF7',
        'warm-white': '#F5F7F2',
        sand: '#E8E4DE',
        earth: '#8B7355',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        'leaf-float': 'leaf-float 20s linear infinite',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
