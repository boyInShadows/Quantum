/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        quantum: {
          blue: "#2D9CDB",
          purple: "#9B51E0",
          pink: "#FF4D8D",
          green: "#6FCF97",
          navy: "#1A2233",
          white: "#F5F6FA",
          gray: "#7B8FA1",
        },
      },
    },
  },
  plugins: [],
};
