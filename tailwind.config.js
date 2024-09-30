module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderColor: ['focus'], // Enable focus variant for borderColor
      // Other variants can be extended here
    },
  },
  plugins: [],
}
