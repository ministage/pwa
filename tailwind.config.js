module.exports = {
  purge: {
    enabled: false,
    content: [
      './public/index.html', 
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './src/*.vue'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // eslint-disable-next-line no-unused-vars
      backgroundImage: theme => ({
        'room': "url('/img/room.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
