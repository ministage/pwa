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
      backgroundImage: theme => ({
        'room': "url('https://www.californiaharderwijk.nl/wp-content/uploads/2019/02/DSC08976.jpg')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
