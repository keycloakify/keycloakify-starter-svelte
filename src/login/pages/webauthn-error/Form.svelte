<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import ActionGroup from '../../components/buttons/ActionGroup.svelte';
  import Button from '../../components/buttons/Button.svelte';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'webauthn-error.ftl');
  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();

  const { url, isAppInitiatedAction } = kcContext;

  const refreshPage = () => {
    (document.getElementById('isSetRetry') as HTMLInputElement).value = 'retry';
    (document.getElementById('executionValue') as HTMLInputElement).value = '${execution}';
    (document.getElementById('kc-error-credential-form') as HTMLFormElement).requestSubmit();
  };
</script>

<form
  id="kc-error-credential-form"
  class={kcClsx('kcFormClass')}
  action={url.loginAction}
  method="post"
  hidden
>
  <input
    type="hidden"
    id="executionValue"
    name="authenticationExecution"
  />
  <input
    type="hidden"
    id="isSetRetry"
    name="isSetRetry"
  />

  <ActionGroup horizontal>
    <Button
      type="submit"
      id="kc-try-again"
      name="try-again"
      class={kcClsx('kcButtonPrimaryClass', 'kcButtonBlockClass')}
      onclick={refreshPage}
    >
      {@render msg('doTryAgain')()}
    </Button>
    {#if isAppInitiatedAction}
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
</form>
