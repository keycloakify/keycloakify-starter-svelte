import { onMount } from 'svelte';

export function useSetBodyId() {
  onMount(() => {
    document.body.setAttribute('id', 'keycloak-bg');

    return () => {
      document.body.removeAttribute('id');
    };
  });
}
