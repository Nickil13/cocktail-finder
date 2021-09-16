const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'serif': ["'Bebas Neue'", ...defaultTheme.fontFamily.serif],
      'sans': ["Montserrat",...defaultTheme.fontFamily.sans],
    },
    extend: {
      backgroundImage: theme =>({
        "hero-background": "url(./images/cocktails.jpg)",
        "summer-background": "url(./images/summerCocktails.jpg)",
      }),
      minHeight:{
        'card': '200px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
