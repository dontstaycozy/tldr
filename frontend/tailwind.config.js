/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'parchment': '#FEF2CD',
        'obsidian': '#181200',
        'muted-gold': '#CBBF9C',
        'deep-sand': '#998F6E',
      },
      fontFamily: {
        'headline': ['"Playfair Display"', 'serif'],
        'body': ['"Merriweather"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      spacing: {
        'grid': '8px',
      }
    },
  },
  plugins: [],
}
