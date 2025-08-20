import { onMount } from 'svelte';
import { useKcClsx } from '../../../../@keycloakify/login-ui-svelte/useKcClsx';

export function useSetBodyClassName() {
  const { kcClsx } = useKcClsx();

  onMount(() => {
    const className = kcClsx('kcBodyClass');

    const tokens = className.split(' ');

    document.body.classList.add(...tokens);

    return () => {
      document.body.classList.remove(...tokens);
    };
  });
}
