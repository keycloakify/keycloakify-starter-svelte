import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePlugin from 'esbuild-svelte';
import { buildEmailTheme } from 'keycloakify-emails';
import { keycloakify } from 'keycloakify/vite-plugin';
import { join } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    keycloakify({
      themeName: 'keycloakify-starter-svelte',
      accountThemeImplementation: 'none',
      postBuild: async (buildContext) => {
        await buildEmailTheme({
          templatesSrcDirPath: join(import.meta.dirname, '/emails/templates'),
          themeNames: buildContext.themeNames,
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          locales: ['en'],
          cwd: import.meta.dirname,
          esbuild: {
            mainFields: ['svelte', 'module', 'main'],
            conditions: ['svelte'],
            packages: 'bundle',
            plugins: [
              sveltePlugin({
                compilerOptions: { generate: 'server' },
              }),
            ],
          },
        });
      },
    }),
  ],
});
