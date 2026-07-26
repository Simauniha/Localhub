/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff4d6d',  // pink
          dark: '#c9184a',     // dark pink
          600: '#7209b7'       // purple
        }
      }
    },
  },
  plugins: [],
}