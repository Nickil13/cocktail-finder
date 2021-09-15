module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme =>({
        "hero-background": "url(./images/cocktails.jpg)",
        "summer-background": "url(./images/summerCocktails.jpg)",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
