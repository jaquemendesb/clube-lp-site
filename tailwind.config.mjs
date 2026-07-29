/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'clube-azul-escuro': '#24224C',
        'clube-azul-claro': '#C0E3EB',
        'clube-rosa': '#DD60A0',
        'clube-amarelo': '#FFD055',
        'clube-bege': '#F9F3ED',
        'clube-branco': '#FFFFFF',
      },
      spacing: {
        'space-xs': '8px',
        'space-sm': '16px',
        'space-md': '24px',
        'space-lg': '32px',
        'space-xl': '48px',
        'space-2xl': '64px',
        'space-3xl': '96px',
      },
      borderRadius: {
        'radius-sm': '8px',
        'radius-md': '15px',
        'radius-lg': '20px',
        'radius-xl': '25px',
      },
      fontFamily: {
        heading: ['"Montserrat Alternates"', 'sans-serif'],
        script: ['"Rialto Script"', 'cursive'],
        body: ['Poppins', 'sans-serif'], // Nexa Regular não pode ser usada em texto de página (licença) — ver tokens.css
      },
    },
  },
  plugins: [],
};
