/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '10px': '10px',
      },
      borderRadius: {
        '50%' : '50%',
      },
      colors : {
        'surface' : 'rgba(0,0,0,0.32)'
      }
    },
  },
  plugins: [],
}
