/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#5052F4',
        customViolet: '#7091e6',
        customBack: '#ECF6FF',
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          'montserrat': ['Montserrat'],
        },
      },
    },
  },
  plugins: [],
};