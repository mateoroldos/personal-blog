const colors = require("tailwindcss/colors");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        gray: colors.stone,
        primary: {
          50: "#FEFCF5",
          100: "#FBF1C8",
          200: "#F9E5A0",
          300: "#F5D878",
          400: "#F0CC54",
          500: "#E9BD35",
          600: "#CF9F20",
          700: "#A6791A",
          800: "#7E5616",
          900: "#5D3D13",
          950: "#422B0D",
        },
        transitionProperty: {
          height: "height",
        },
      },
      maxWidth: {
        container: "41rem",
      },
    },
  },
  plugins: [typography],
};
