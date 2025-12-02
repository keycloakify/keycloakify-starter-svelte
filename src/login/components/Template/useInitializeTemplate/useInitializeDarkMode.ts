import { useInitializeDarkMode as useInitializeDarkMode_base } from '../../../../@keycloakify/login-ui-svelte/useInitializeDarkMode';
import { useKcClsx } from '../../../../@keycloakify/login-ui-svelte/useKcClsx';
import { useKcContext } from '../../../KcContext.gen';

export function useInitializeDarkMode() {
  const { kcContext } = useKcContext();

  const { kcClsx } = useKcClsx();

  useInitializeDarkMode_base({
    doEnableDarkModeIfPreferred: kcContext.darkMode ?? true,
    htmlDarkModeClassName: kcClsx('kcDarkModeClass'),
  });
}
