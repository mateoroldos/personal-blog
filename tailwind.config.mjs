const colors = require("tailwindcss/colors");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        primary: colors.orange,
        transitionProperty: {
          height: "height",
        },
      },
      maxWidth: {
        container: "36rem",
      },
    },
  },
  plugins: [typography],
};
