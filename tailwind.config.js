/** @type {import('tailwindcss').Config} */
export default {
  content: [   "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { fontFamily: {
      'helvetica-neue': ['Helvetica Neue', 'Arial', 'sans-serif'],
    },},
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        mytheme: {
          

"primary": "#111827",
          

"secondary": "#f3f4f6",
          

"accent": "#00ffff",
          

"neutral": "#111827",
          

"base-100": "#111827",
          

"info": "#2563eb",
          

"success": "#00ff00",
          

"warning": "#00ff00",
          

"error": "#ff0000",
          },
        },
      ],
    },
}

