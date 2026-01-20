// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'; // <--- OJO: Esta es la importación correcta para v4
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://fj-cueva.com',
  
  // Configuración para Tailwind v4
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});