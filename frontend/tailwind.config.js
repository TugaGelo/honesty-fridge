/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        golda: {
          cream: '#E8DAB2',   // App Background
          coffee: '#3E2723',  // Text and Headers
          yellow: '#F4C430',  // Primary Buttons & Highlights
          green: '#2E7D32',   // Positive Numbers
          white: '#FFFFFF',   // Card Backgrounds
        }
      }
    },
  },
  plugins: [],
}
