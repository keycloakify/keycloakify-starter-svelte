import { onMount } from 'svelte';
import { useKcClsx } from '../../../../@keycloakify/login-ui-svelte/useKcClsx';

export function useSetRootHtmlElementClassName() {
  const { kcClsx } = useKcClsx();

  onMount(() => {
    const className = kcClsx('kcHtmlClass');

    const tokens = className.split(' ');

    document.documentElement.classList.add(...tokens);

    return () => {
      document.documentElement.classList.remove(...tokens);
    };
  });
}
