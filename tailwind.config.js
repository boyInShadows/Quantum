/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        earthOrbiter: ["earthOrbiter", "sans-serif"],
      },
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
      fontSize: {
        // Heading sizes with responsive scaling
        h1: [
          "clamp(2.5rem, 5vw, 4.5rem)",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        h2: [
          "clamp(2rem, 4vw, 3.5rem)",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        h3: [
          "clamp(1.5rem, 3vw, 2.5rem)",
          {
            lineHeight: "1.3",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        h4: [
          "clamp(1.25rem, 2.5vw, 2rem)",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
            fontWeight: "500",
          },
        ],
        h5: [
          "clamp(1.125rem, 2vw, 1.5rem)",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
            fontWeight: "500",
          },
        ],
        h6: [
          "clamp(1rem, 1.5vw, 1.25rem)",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
            fontWeight: "500",
          },
        ],

        // Body text sizes
        "body-lg": [
          "clamp(1.125rem, 1.5vw, 1.25rem)",
          {
            lineHeight: "1.6",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        body: [
          "clamp(1rem, 1.2vw, 1.125rem)",
          {
            lineHeight: "1.6",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "body-sm": [
          "clamp(0.875rem, 1vw, 1rem)",
          {
            lineHeight: "1.6",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "body-xs": [
          "clamp(0.75rem, 0.8vw, 0.875rem)",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],

        // Display sizes for hero sections
        "display-2xl": [
          "clamp(3rem, 6vw, 6rem)",
          {
            lineHeight: "1",
            letterSpacing: "-0.03em",
            fontWeight: "800",
          },
        ],
        "display-xl": [
          "clamp(2.5rem, 5vw, 5rem)",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 4rem)",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],

        // Special sizes
        lead: [
          "clamp(1.25rem, 2vw, 1.5rem)",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        caption: [
          "clamp(0.75rem, 0.8vw, 0.875rem)",
          {
            lineHeight: "1.4",
            letterSpacing: "0.01em",
            fontWeight: "400",
          },
        ],
        overline: [
          "clamp(0.75rem, 0.8vw, 0.875rem)",
          {
            lineHeight: "1.4",
            letterSpacing: "0.1em",
            fontWeight: "500",
            textTransform: "uppercase",
          },
        ],
      },
    },
  },
  plugins: [],
};
