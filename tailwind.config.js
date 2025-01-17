/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "rgb(23, 43, 77)",
        greyText: "rgb(145, 158, 171)",
      },

      fontSize: {
        16: "16px",
        20: "20px",
      },
      fontFamily: { inter: "Inter-Regular,Helvetica" },
    },
  },
  plugins: [],
};
