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
        xxs: "270px",
        xs: "475px",
        ...defaultTheme.screens,
      },
      animation: {
        "skew-scroll": "skew-scroll 8s linear alternate-reverse infinite",
      },
      keyframes: {
        "skew-scroll": {
          "0%": {
            transform:
              "rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(40%)",
          },
          "100%": {
            transform:
              "rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-140%)",
          },
        },
      },
    },
  },
  plugins: [],
};
