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
      height: {
        'nav': '100px',
        'screen-90': '90vh'
      },
      margin: {
        'nav': '100px'
      },
      screens: {
        'xsm': '500px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
