// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare'; // <--- 1. IMPORTAR ADAPTADOR

export default defineConfig({
  site: 'https://fj-cueva.com',
  
  adapter: cloudflare(), // <--- 3. CONECTAR CON CLOUDFLARE

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