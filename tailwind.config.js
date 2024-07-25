
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'desert-orange': '#F0A13A',
        'desert-turquoise': '#95DED5',
        'desert-brown': '#522A27',
        'desert-red': '#C73E1D',
        'desert-green': '#646F58',
        'desert-green-dark': '#3D4337',
        'desert-green-light': '#E0E3DD'
      },
      fontFamily: {
        playwrite: ['var(--font-playwrite-ar)'],
        junkie: ['var(--font-junkie-cowboy)']
      }
    },
  },
  plugins: [],
}

