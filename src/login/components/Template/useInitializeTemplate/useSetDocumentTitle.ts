import { onMount } from 'svelte';
import { useKcContext } from '../../../KcContext.gen';
import { useI18n } from '../../../i18n';

export function useSetDocumentTitle() {
  const { kcContext } = useKcContext();

  const { msgStr } = useI18n();

  onMount(() => {
    const title_before = document.title;

    document.title = msgStr('loginTitle', kcContext.realm.displayName || '');

    return () => {
      document.title = title_before;
    };
  });
}
