module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //
        componets_white: "#F1F3F5",

        App_white_L: "#F0F0F0",
        App_green_L: "#24AF65",
        App_blue_L: "#4F98CA",
        App_black_L: "#272727",

        // dark Mode
        App_white_D: "#161616",
        App_green_D: "#0BDA6C",
        App_blue_D: "#1886D1",
        App_black_D: "#C2C2C2",
      },

      keyframes: {
        fadeIn: {
          "0%": { backgroundColor: "transparent" },
          "100%": { backgroundColor: "#24242454" },
        },
      },

      animation: {
        fadeIn: "fadeIn 2s ease-in-out linear",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
