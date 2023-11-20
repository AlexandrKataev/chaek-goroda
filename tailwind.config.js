/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: { sans: ['Helvetica Neue', 'sans-serif'] },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
};
