/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hopin: {
          bg: '#FAF8F5',
          dark: '#121624',
          'dark-surface': '#1C2235',
          'dark-card': '#242B42',
          // Vibrant playful palette
          pink: '#FF4D8D',
          'pink-light': '#FFE4EF',
          'pink-sticky': '#FFD1E3',
          blue: '#3259FE',
          'blue-light': '#E9F0FE',
          'blue-sticky': '#D7E5FF',
          orange: '#FF6B35',
          'orange-light': '#FFF0E8',
          'orange-sticky': '#FFE0D3',
          lime: '#00E599',
          'lime-light': '#E6FBF2',
          'lime-sticky': '#D5FBE9',
          yellow: '#FFD000',
          'yellow-light': '#FFF9D6',
          'yellow-sticky': '#FEF3A7',
          purple: '#9B51E0',
          'purple-sticky': '#EAD9FF',
          // Neutrals
          border: '#E8E5DD',
          'border-dark': '#2A324B',
          muted: '#6E768E',
          'muted-light': '#9CA3AF',
          card: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        brico: ['"Bricolage Grotesque"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        carDrive: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        roadMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-100px 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        }
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'car-drive': 'carDrive 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
