/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vaultBlack: '#121212',
        vaultGold: '#D4AF37',
        vaultOffWhite: '#FBFBFB',
      },
    },
  },
  plugins: [],
}