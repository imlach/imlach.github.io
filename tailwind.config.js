export default {
  content: [
    "./index.html",
    "./film.html",
    "./live.html",
    "./portfolio/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'Arial', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#000000',
        'brand-gray': '#1a1a1a',
      }
    },
  },
  plugins: [],
}
