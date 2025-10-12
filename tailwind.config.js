/** @type {import('tailwindcss').Config} */
module.exports = {
  // Incluimos todos los paths donde usaremos NativeWind
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Colores oficiales de Spotify
        spotify: {
          green: '#1DB954',
          'green-light': '#1ed760',
          black: '#191414',
          white: '#FFFFFF',
          gray: '#535353',
          'gray-light': '#B3B3B3',
        },
      },
    },
  },
  plugins: [],
}