/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 🌙 control manual con classList
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // azul principal
        accent: '#4f46e5',  // violeta de acción
        contraste: '#facc15', // amarillo alto contraste
      },
      fontSize: {
        base: 'calc(var(--font-scale, 1rem))',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        soft: '0 2px 10px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
