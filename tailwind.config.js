module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      outline: {
        blue: '2px solid #0000ff',
      }
    },
    fontFamily: {
      'neue': 'testfont',
      'start': 'pstart',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
