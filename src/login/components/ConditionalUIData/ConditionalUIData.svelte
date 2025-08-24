<script lang="ts">
  /* eslint svelte/valid-compile: ["error", { ignoreWarnings: true }] */
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import { useScript } from './useScript';

  const { kcContext } = useKcContext();
  assert(kcContext.enableWebAuthnConditionalUI);

  const { msg } = useI18n();

  const authButtonId = 'authenticateWebAuthnButton';

  useScript({ authButtonId });

  const { kcClsx } = useKcClsx();
</script>

{#if kcContext.enableWebAuthnConditionalUI}
  <form
    id="webauth"
    action={kcContext.url.loginAction}
    method="post"
  >
    <input
      type="hidden"
      id="clientDataJSON"
      name="clientDataJSON"
    />
    <input
      type="hidden"
      id="authenticatorData"
      name="authenticatorData"
    />
    <input
      type="hidden"
      id="signature"
      name="signature"
    />
    <input
      type="hidden"
      id="credentialId"
      name="credentialId"
    />
    <input
      type="hidden"
      id="userHandle"
      name="userHandle"
    />
    <input
      type="hidden"
      id="error"
      name="error"
    />
  </form>

  <a
    id="authenticateWebAuthnButton"
    href="#"
    class={kcClsx('kcButtonSecondaryClass', 'kcButtonBlockClass', 'kcMarginTopClass')}
  >
    {@render msg('webauthn-doAuthenticate')()}
  </a>
{/if}
