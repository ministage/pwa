module.exports = {
  purge: {
    enabled: true,
    content: [
      './public/index.html', 
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './src/*.vue'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        // => @media (min-width: 375px) { ... }
      },
      minWidth: {
        '1/3': '33.333333%',
        '1/6': '16.666667%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
