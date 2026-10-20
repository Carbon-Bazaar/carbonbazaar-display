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
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        gambetta: ['var(--font-gambetta)', 'Georgia', 'serif'],
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
        // Landing page — watercolour paper & ink
        paper: '#F6F1E7',
        ink: '#1F2A24',
        'warm-white': '#F5F7F2',
        sand: '#E8E4DE',
        earth: '#8B7355',
        // Brand palette sampled from the designer's mockups
        brand: {
          green: '#469927',
          'green-hover': '#3B8420',
          blue: '#005492',
          pine: '#244D3D',
          ink: '#0F2E22',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
      },
      // Tailwind 3.3's opacity scale lacks these steps (added by default in 3.4);
      // without them modifiers like `bg-white/45` silently generate no CSS.
      opacity: {
        15: '0.15',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
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
        marquee: 'marquee 38s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
