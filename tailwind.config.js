/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'card-shadow':'0px 10px 20px rgba(0, 0, 0, 0.2)'
      },
      screens:{
        'hp':'320px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
