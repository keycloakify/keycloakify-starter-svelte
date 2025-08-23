import { onMount } from 'svelte';
import { assert } from 'tsafe/assert';
import { useInsertScriptTags } from '../../../@keycloakify/login-ui-svelte/tools/useInsertScriptTags';
import { waitForElementMountedOnDom } from '../../../@keycloakify/login-ui-svelte/tools/waitForElementMountedOnDom';
import { BASE_URL } from '../../../kc.gen';
import { useI18n } from '../../i18n';
import { useKcContext } from '../../KcContext.gen';

export function useScript(params: { authButtonId: string }) {
  const { authButtonId } = params;

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'webauthn-authenticate.ftl');

  const { msgStr, isFetchingTranslations } = useI18n();
  const { isUserIdentified, challenge, userVerification, rpId, createTimeout } = kcContext;

  const { insertScriptTags } = useInsertScriptTags({
    effectId: 'WebauthnAuthenticate',
    scriptTags: [
      {
        type: 'module',
        textContent: () => `

                    import { authenticateByWebAuthn } from "${BASE_URL}keycloak-theme/login/js/webauthnAuthenticate.js";
                    const authButton = document.getElementById('${authButtonId}');
                    authButton.addEventListener("click", function() {
                        const input = {
                            isUserIdentified : ${isUserIdentified},
                            challenge : '${challenge}',
                            userVerification : '${userVerification}',
                            rpId : '${rpId}',
                            createTimeout : ${createTimeout},
                            errmsg : "${msgStr('webauthn-unsupported-browser-text')}"
                        };
                        authenticateByWebAuthn(input);
                    });

                `,
      },
    ],
  });

  onMount(() => {
    if (isFetchingTranslations) {
      return;
    }

    (async () => {
      await waitForElementMountedOnDom({
        elementId: authButtonId,
      });
      insertScriptTags();
    })();
  });
}
