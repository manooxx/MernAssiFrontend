// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 10px theme('colors.pink.400'), 0 0 50px theme('colors.purple.700')",
      },
    },
  },
  plugins: [],
};
