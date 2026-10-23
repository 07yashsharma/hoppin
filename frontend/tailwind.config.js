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
          bg: '#F5F3EB',
          dark: '#171916',
          'dark-surface': '#20231F',
          'dark-card': '#272B25',
          lime: '#C5F55A',
          'lime-hover': '#B6E84A',
          cobalt: '#345CFF',
          'cobalt-light': '#5A7CFF',
          orange: '#FF7948',
          border: '#E5E3DA',
          'border-dark': '#2E322C',
          muted: '#78766E',
          'muted-light': '#9B998F',
          card: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        brico: ['"Bricolage Grotesque"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
