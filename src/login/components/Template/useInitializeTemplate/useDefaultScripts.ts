import { useInsertScriptTags } from '../../../../@keycloakify/login-ui-svelte/tools/useInsertScriptTags';
import { useKcContext } from '../../../KcContext.gen';

export function useDefaultScripts() {
  const { kcContext } = useKcContext();

  const { insertScriptTags } = useInsertScriptTags({
    effectId: 'Template',
    scriptTags: [
      ...(kcContext.scripts === undefined
        ? []
        : kcContext.scripts.map((src) => ({
            type: 'text/javascript' as const,
            src,
          }))),
    ],
  });

  return { insertScriptTags };
}
