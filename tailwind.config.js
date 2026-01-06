/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "280px",
        sm: "600px",
        md: "768px",
        xmd: "960",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
