const { BG_IMG } = require("./src/utils/constants");
const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-imgnt": `url(${BG_IMG})`,
      },
      screens: {
        xs: "475px",
        xxs:"270px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
