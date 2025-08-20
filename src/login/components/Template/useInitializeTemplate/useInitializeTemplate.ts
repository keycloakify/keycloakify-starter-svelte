import { onMount } from 'svelte';
import { useDefaultCss } from './useDefaultCss';
import { useDefaultScripts } from './useDefaultScripts';
import { useInitializeDarkMode } from './useInitializeDarkMode';
import { useSetBodyClassName } from './useSetBodyClassName';
import { useSetBodyId } from './useSetBodyId';
import { useSetBodyPageIdAttribute } from './useSetBodyPageIdAttribute';
import { useSetDocumentTitle } from './useSetDocumentTitle';
import { useSetRootHtmlElementClassName } from './useSetRootHtmlElementClassName';

export function useInitializeTemplate() {
  useInitializeDarkMode();
  useSetDocumentTitle();
  useSetRootHtmlElementClassName();
  useSetBodyClassName();
  useSetBodyPageIdAttribute();
  useSetBodyId();
  const { areAllStyleSheetsLoaded } = useDefaultCss();
  const { insertScriptTags } = useDefaultScripts();

  onMount(() => {
    const unsubscribe = areAllStyleSheetsLoaded.subscribe((loaded) => {
      if (loaded) {
        insertScriptTags();
      }
    });
    return () => unsubscribe();
  });

  return { isReadyToRender: areAllStyleSheetsLoaded };
}
