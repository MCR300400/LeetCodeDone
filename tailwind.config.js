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
          orange: '#f97316',
          yellow: '#fb923c',
          dark: '#121316',
          bg: '#121316',
          card: '#191a20',
          cardHover: '#22242c',
          border: '#262830',
          easy: '#10b981',
          medium: '#f59e0b',
          hard: '#f43f5e',
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
