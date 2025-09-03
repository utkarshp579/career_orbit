/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class", // enables `.dark` variant
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"), // since you imported "tw-animate-css"
  ],
};

export default config;
