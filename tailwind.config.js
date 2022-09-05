
const colors = require('tailwindcss/colors')

module.exports= {
  mode: "jit",
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.indigo[300],
          DEFAULT: colors.indigo[500],
          dark: colors.indigo[700],
        },  
        secondary: {
          light: colors.purple[300],
          DEFAULT: colors.purple[500],
          dark: colors.purple[700],
        },  
        danger: {
          light: colors.red[300],
          DEFAULT: colors.red[500],
          dark: colors.red[700],
        },
        warning: {
          light: colors.orange[300],
          DEFAULT: colors.orange[500],
          dark: colors.orange[700],
        },
        info: {
          light: colors.blue[300],
          DEFAULT: colors.blue[500],
          dark: colors.blue[700],
        },
        success: {
          light: colors.green[300],
          DEFAULT: colors.green[500],
          dark: colors.green[700],
        },
        dark: colors.gray[900],
        light: colors.gray[100],
        disabled:colors.gray[300]
      },
      
    },
  },
  screens: {
    "2xs": "320px",
    xs: "475px",
    sm: "640px",

    md: "768px",

    lg: "1024px",

    xl: "1280px",

    "2xl": "1536px",
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ], 
};
