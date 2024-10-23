/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slow-bounce': 'slow-bounce 2s infinite', // Adjust duration as needed
      },
      keyframes: {
        'slow-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(2rem)' }, // Adjust the height of the bounce
        },
      },
    },
  },
  variants: {},
  plugins: [],
}