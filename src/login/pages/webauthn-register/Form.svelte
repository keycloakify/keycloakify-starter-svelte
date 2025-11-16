<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import LogoutOtherSessions from '../../components/LogoutOtherSessions.svelte';
  import ActionGroup from '../../components/buttons/ActionGroup.svelte';
  import Button from '../../components/buttons/Button.svelte';
  import { useI18n } from '../../i18n';
  import { useRegister } from './useRegister';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'webauthn-register.ftl');
  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();

  const { url, isSetRetry, isAppInitiatedAction } = kcContext;

  const { register } = useRegister();
</script>

<div class={kcClsx('kcFormClass')}>
  <form
    id="register"
    action={url.loginAction}
    method="post"
  >
    <div class={kcClsx('kcFormGroupClass')}></div>
    <input
      type="hidden"
      id="clientDataJSON"
      name="clientDataJSON"
    />
    <input
      type="hidden"
      id="attestationObject"
      name="attestationObject"
    />
    <input
      type="hidden"
      id="publicKeyCredentialId"
      name="publicKeyCredentialId"
    />
    <input
      type="hidden"
      id="authenticatorLabel"
      name="authenticatorLabel"
    />
    <input
      type="hidden"
      id="transports"
      name="transports"
    />
    <input
      type="hidden"
      id="error"
      name="error"
    />
    <LogoutOtherSessions></LogoutOtherSessions>
  </form>

  <!-- Action button -->
  <ActionGroup horizontal>
    <Button
      type="button"
      id="registerWebAuthn"
      class={kcClsx('kcButtonPrimaryClass', 'kcButtonBlockClass')}
      onclick={register}
    >
      {@render msg('doRegisterSecurityKey')()}
    </Button>
    {#if isSetRetry && isAppInitiatedAction}
      <form
        action={url.loginAction}
        class={kcClsx('kcFormClass')}
        id="kc-webauthn-settings-form"
        method="post"
      >
        <Button
          type="submit"
          id="cancelWebAuthnAIA"
          name="cancel-aia"
          class={kcClsx('kcButtonSecondaryClass', 'kcButtonBlockClass')}
        >
          {@render msg('doCancel')()}
        </Button>
      </form>
    {/if}
  </ActionGroup>
</div>
