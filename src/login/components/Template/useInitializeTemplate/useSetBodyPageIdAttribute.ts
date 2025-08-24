import { onMount } from 'svelte';
import { useKcContext } from '../../../KcContext.gen';

export function useSetBodyPageIdAttribute() {
  const { kcContext } = useKcContext();

  onMount(() => {
    const name = 'data-page-id';

    document.body.setAttribute(name, `login-${kcContext.pageId.replace(/\.ftl$/, '')}`);

    return () => {
      document.body.removeAttribute(name);
    };
  });
}
