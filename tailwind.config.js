const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'dark': { 'raw': '(prefers-color-scheme: dark)' },
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.green,
      lightyellows: {
        DEFAULT: '#FBFF1F',
        lemon: '#FBFF1F'
      },
      gray: {
        lightest: '#282828',
        light: '#373737',
        DEFAULT: '#232626',
        dark: '#18191A',
        darkest: '#282828'
      },
      featured: {
        DEFAULT: '#8F32EE'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
