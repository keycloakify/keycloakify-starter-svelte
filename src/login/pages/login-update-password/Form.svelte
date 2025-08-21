<script lang="ts">
  import { assert } from 'tsafe';
  import { useState } from '../../../@keycloakify/login-ui-svelte/tools/useState';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import LogoutOtherSessions from '../../components/LogoutOtherSessions.svelte';
  import NewPasswordFormField from '../../components/NewPasswordFormField.svelte';
  import ActionGroup from '../../components/buttons/ActionGroup.svelte';
  import Button from '../../components/buttons/Button.svelte';
  import { useI18n } from '../../i18n';
  import { REQUIRE_CONFIRM_PASSWORD } from './REQUIRE_CONFIRM_PASSWORD';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-update-password.ftl');
  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, isAppInitiatedAction } = kcContext;

  const [areAllNewPasswordChecksPassed, setAreAllNewPasswordChecksPassed] = useState(false);
</script>

<form
  id="kc-passwd-update-form"
  class={kcClsx('kcFormClass')}
  action={url.loginAction}
  method="post"
  novalidate
>
  <NewPasswordFormField
    usecase={{ pageId: kcContext.pageId }}
    testUserPatienceWithConfirmationLikeIts1998={REQUIRE_CONFIRM_PASSWORD}
    onAreAllCheckPassedValueChange={setAreAllNewPasswordChecksPassed}
  ></NewPasswordFormField>

  <div class={kcClsx('kcFormGroupClass')}>
    <LogoutOtherSessions />
  </div>
  <ActionGroup horizontal={true}>
    {#if isAppInitiatedAction}
      <Button
        type="submit"
        class={kcClsx('kcButtonPrimaryClass')}
        id="kc-submit"
        name="login"
        disabled={!$areAllNewPasswordChecksPassed}
      >
        {@render msg('doSubmit')()}
      </Button>
      <Button
        type="submit"
        class={kcClsx('kcButtonSecondaryClass')}
        id="kc-cancel"
        name="cancel-aia"
      >
        {@render msg('doCancel')()}
      </Button>
    {:else}
      <Button
        type="submit"
        class={kcClsx('kcButtonPrimaryClass', 'kcButtonBlockClass')}
        id="kc-submit"
        name="login"
        disabled={!$areAllNewPasswordChecksPassed}
      >
        {@render msg('doSubmit')()}
      </Button>
    {/if}
  </ActionGroup>
</form>
