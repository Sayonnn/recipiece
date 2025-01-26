/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tangerine: ["Tangerine", "serif"],
        sacramento: ["Sacramento", "serif"],
        greatVibe: ["Great Vibes", "serif"],
        sixtyFour: ["Six Caps", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: { 
        light: "#ffffff", // Light mode background
        dark: "#1a1a1a", // Dark mode background
      },
      backgroundColor: {
        light: "var(--color-light)", // Use CSS variables for easier theming
        dark: "var(--color-dark)",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
