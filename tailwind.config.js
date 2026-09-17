/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        leetcode: {
          orange: '#FFA116',
          yellow: '#FFB800',
          dark: '#1A1A1A',
          bg: '#0F1218',
          card: '#181E29',
          cardHover: '#1F2634',
          border: '#283141',
          easy: '#00B8A3',
          medium: '#FFC01E',
          hard: '#FF375F',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
