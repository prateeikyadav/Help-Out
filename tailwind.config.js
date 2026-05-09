/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4EE',
        cream2: '#EDE9E0',
        ink: '#0E0D0B',
        muted: '#7A7368',
        rule: '#D8D3C8',
        accent: '#C63D1A',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        heading: ['"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
