/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#1D1B23",
        white: "#F9F9FC",
        grey: "#EDEDEF",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, #DEDADA 0%, #EAEAEA 77%, #C2BEE7 100%)",
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
