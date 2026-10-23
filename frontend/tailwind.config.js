/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Master Premium Dark Design System
        bg: '#101114',
        secondary: '#15171B',
        card: '#1B1E24',
        elevated: '#21242B',
        primary: '#E8E9ED',
        muted: '#969AA5',
        accent: {
          DEFAULT: '#8B8DFF',
          hover: '#7A7CFA',
          subtle: 'rgba(139, 141, 255, 0.12)'
        },
        border: '#292C33',
        success: {
          DEFAULT: '#34D399',
          surface: '#132821'
        },
        error: {
          DEFAULT: '#F87171',
          surface: '#2C1B20'
        },
        // Backward-compatibility aliases mapped strictly to the dark system
        hopin: {
          bg: '#101114',
          dark: '#101114',
          'dark-surface': '#15171B',
          'dark-card': '#1B1E24',
          card: '#1B1E24',
          elevated: '#21242B',
          border: '#292C33',
          'border-dark': '#292C33',
          text: '#E8E9ED',
          muted: '#969AA5',
          accent: '#8B8DFF',
          lime: '#8B8DFF',
          blue: '#8B8DFF',
          pink: '#8B8DFF',
          orange: '#8B8DFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        'elevated': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
