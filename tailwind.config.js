module.exports = {
  purge: [],
  // prefix: 'tw-',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          "@screen md": {
            paddingLeft: "4rem",
            paddingRight: "4rem",
          },
        }
      })
    },
    function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: '16px' },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })
    }
  ]
}
