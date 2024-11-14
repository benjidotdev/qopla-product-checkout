/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "qopla-green": "#084625",
        "qopla-gold": "#fcdfb2",
      },
      backgroundImage: {
        'bg-image': "url('./assets/background/bg-image.svg')",
      },
    },
  },
  plugins: [],
};
