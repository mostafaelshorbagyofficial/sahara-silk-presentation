/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sahara: {
          50: '#FAF8F5',
          100: '#F3EFEA',
          200: '#E8DFC8',
          300: '#DBCFB0',
          400: '#C5A880',
          500: '#A9875A',
          600: '#8A693F',
          700: '#6B4F2D',
          800: '#4D371E',
          900: '#2E1F0F',
          950: '#1A1108',
        },
        gold: {
          light: '#F5E6C8',
          DEFAULT: '#C5A880',
          rich: '#D4AF37',
          deep: '#997938',
          accent: '#E6C687'
        },
        noir: {
          DEFAULT: '#0C0C0C',
          card: '#141311',
          surface: '#1A1815',
          border: '#282520',
          hover: '#22201C',
          elevated: '#2E2B25'
        },
        terracotta: {
          light: '#E29578',
          DEFAULT: '#B86B4B',
          dark: '#8C4629'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        arabicSerif: ['"Amiri"', 'serif'],
        arabicSans: ['"Cairo"', '"Tajawal"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
