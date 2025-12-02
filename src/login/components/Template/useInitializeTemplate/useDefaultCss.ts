import { useInsertLinkTags } from '../../../../@keycloakify/login-ui-svelte/tools/useInsertLinkTags';
import { useKcClsx } from '../../../../@keycloakify/login-ui-svelte/useKcClsx';
import { BASE_URL } from '../../../../kc.gen';

export function useDefaultCss() {
  const { doUseDefaultCss } = useKcClsx();

  const { areAllStyleSheetsLoaded } = useInsertLinkTags({
    effectId: 'Template',
    hrefs: !doUseDefaultCss
      ? []
      : [
          `${BASE_URL}keycloak-theme/login/resources-common/vendor/patternfly-v5/patternfly.min.css`,
          `${BASE_URL}keycloak-theme/login/resources-common/vendor/patternfly-v5/patternfly-addons.css`,
          `${BASE_URL}keycloak-theme/login/css/login.css`,
        ],
  });

  return { areAllStyleSheetsLoaded };
}
