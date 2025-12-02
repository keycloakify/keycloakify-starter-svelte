import { onMount } from 'svelte';
import { assert } from 'tsafe/assert';
import { useInsertScriptTags } from '../../../@keycloakify/login-ui-svelte/tools/useInsertScriptTags';
import { waitForElementMountedOnDom } from '../../../@keycloakify/login-ui-svelte/tools/waitForElementMountedOnDom';
import { BASE_URL } from '../../../kc.gen';
import { useI18n } from '../../i18n';
import { useKcContext } from '../../KcContext.gen';

export function useScript(params: { registerButtonId: string }) {
  const { registerButtonId } = params;

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'webauthn-register.ftl');

  const { msgStr, isFetchingTranslations } = useI18n();
  const {
    userid,
    challenge,
    username,
    rpId,
    createTimeout,
    signatureAlgorithms,
    rpEntityName,
    attestationConveyancePreference,
    authenticatorAttachment,
    requireResidentKey,
    userVerificationRequirement,
    excludeCredentialIds,
  } = kcContext;

  const { insertScriptTags } = useInsertScriptTags({
    effectId: 'WebauthnAuthenticate',
    scriptTags: [
      {
        type: 'module',
        textContent: () => `

                    import { registerByWebAuthn } from "${BASE_URL}keycloak-theme/login/js/webauthnRegister.js";
                    const registerButton = document.getElementById('${registerButtonId}');
                    registerButton.addEventListener("click", function() {
                        const input = {
                            challenge : '${challenge}',
                            userid : '${userid}',
                            username : '${username}',
                            signatureAlgorithms : ${JSON.stringify(signatureAlgorithms)},
                            rpEntityName : '${rpEntityName}',
                            rpId : '${rpId}',
                            attestationConveyancePreference : '${attestationConveyancePreference}',
                            authenticatorAttachment : '${authenticatorAttachment}',
                            requireResidentKey : '${requireResidentKey}',
                            userVerificationRequirement : '${userVerificationRequirement}',
                            createTimeout : ${createTimeout},
                            excludeCredentialIds : '${excludeCredentialIds}',
                            initLabel : "${msgStr('webauthn-registration-init-label')}",
                            initLabelPrompt : "${msgStr('webauthn-registration-init-label-prompt')}",
                            errmsg : "${msgStr('webauthn-unsupported-browser-text')}"
                        };
                        registerByWebAuthn(input);
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
        elementId: registerButtonId,
      });
      insertScriptTags();
    })();
  });
}
