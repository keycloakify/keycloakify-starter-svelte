import { onMount } from 'svelte';
import { initializeDarkMode } from '../login-ui/core/darkMode';

export function useInitializeDarkMode(params: { doEnableDarkModeIfPreferred: boolean; htmlDarkModeClassName: string }) {
  const { doEnableDarkModeIfPreferred, htmlDarkModeClassName } = params;

  onMount(() => {
    if (!doEnableDarkModeIfPreferred) {
      return;
    }

    const { cleanup } = initializeDarkMode({ htmlDarkModeClassName });

    return () => {
      cleanup();
    };
  });
}
