/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        newPink: '#f0645c',
        newSomon: '#f8bc84',
        newPurple: '#c83474',
        newPurple2: '#801c5c',
      }
    },
  },
  plugins: [],
}

