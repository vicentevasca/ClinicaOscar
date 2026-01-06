/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clinic-gold': '#D4AF37', // Dorado elegante para botones/detalles
        'clinic-gold-light': '#F3E5AB', 
        'clinic-navy': '#1A233A', // Azul oscuro para textos fuertes
        'clinic-bg': '#F8FAFC',   // Fondo gris muy claro
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Importar en index.html
        sans: ['"Plus Jakarta Sans"', 'sans-serif'], // Importar en index.html
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}