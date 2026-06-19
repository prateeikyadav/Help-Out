/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F3F1EC',
        card: '#FFFFFF',
        surfaceDark: '#1C1917',
        ink: '#1C1917',
        inkMid: '#6B6760',
        inkLight: '#B0ADA8',
        accent: '#C94030',
        accentLt: '#F5EAE8',
        border: '#E2DED7',
        borderMd: '#C8C3BB',
        cpm: '#C94030',
        cgeneral: '#4A7C7C',
        chr: '#8A5C7A',
        caccountant: '#8A7040',
        chealthcare: '#5A7A5A',
        // Fallbacks for previous pages so we don't break them completely immediately
        cream: '#F3F1EC',
        muted: '#6B6760',
        rule: '#E2DED7',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
        heading: ['"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
