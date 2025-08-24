import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    warningFilter: (warning) => {
      if (['a11y_autofocus'].includes(warning.code)) return false;
      if (warning.message.includes("'#' is not a valid href attribute")) return false;
      return true;
    },
  },
  onwarn: (warning, handler) => {
    if (['a11y_autofocus'].includes(warning.code)) return;
    if (warning.message.includes("'#' is not a valid href attribute")) return false;
    handler(warning);
  },
};
