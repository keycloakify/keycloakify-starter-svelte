import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
// import { keycloakify } from 'keycloakify/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    // keycloakify({
    //   themeName: 'keycloakify-starter-svelte',
    //   accountThemeImplementation: 'none'
    // })
  ],
});
