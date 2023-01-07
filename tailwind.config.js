const pxToRem = (val) => {
  return val/16 + 'rem'
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./_frag/**/*.{js,vue,ts}",
    "./*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      container:{
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '2rem',
        },
      },
      backgroundImage: {
      },
      transformOrigin: {
        "0": "0%",
      },
      colors: {
        primary: "#fec02f",
        secondary: "#212746",
        secondaryDark: "#fec02f1a",
        black: "#080A0D",
        ash: { 
          1 : "#c6cbd4" ,
          2 : "#707070" 
        },
        green: {
          4: "#6FCF97"
        },
        danger: {
          DEFAULT: "#CF0505",
        },
        gray: {
          2: "#4F4F4F",
          3: "#828282",
          4: "#BDBDBD",
        }
      },
      fontFamily: {
      },
      fontSize: {
        '15': pxToRem(15)
      }
    },
  },
  plugins: [],
}