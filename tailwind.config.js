/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sp: "350px",
      pc: "600px",
      // pc: "1200px",
    },
    extend: {},
  },
  plugins: [],
}

