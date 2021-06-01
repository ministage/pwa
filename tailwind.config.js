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
      // eslint-disable-next-line no-unused-vars
      backgroundImage: theme =>
        process.env.NODE_ENV === 'production' ? {
          'room': "url('/pwa/img/room.jpg')",
        } : {
          'room': "url('/img/room.jpg')",
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
