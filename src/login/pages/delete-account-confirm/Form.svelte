<script lang="ts">
  import { assert } from 'tsafe';
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import ActionGroup from '../../components/buttons/ActionGroup.svelte';
  import Button from '../../components/buttons/Button.svelte';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'delete-account-confirm.ftl');

  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, triggered_from_aia } = kcContext;
</script>

<form
  action={url.loginAction}
  class={kcClsx('kcFormClass')}
  id="kc-deleteaccount-form"
  method="post"
>
  <div class={clsx(kcClsx('kcAlertClass'), 'pf-m-warning')}>
    <div class={kcClsx('kcAlertIconClass')}>
      <i
        class={kcClsx('kcFeedbackWarningIcon')}
        aria-hidden="true"
      ></i>
    </div>
    <span class={kcClsx('kcAlertTitleClass')}>
      {@render msg('irreversibleAction')()}
    </span>
  </div>

  <p>{@render msg('deletingImplies')()}</p>
  <ul
    class="pf-v5-c-list"
    role="list"
  >
    <li>{@render msg('loggingOutImmediately')()}</li>
    <li>{@render msg('errasingData')()}</li>
  </ul>

  <p class="delete-account-text">{@render msg('finalDeletionConfirmation')()}</p>

  <ActionGroup>
    <Button
      class={kcClsx('kcButtonPrimaryClass')}
      id="kc-submit"
      type="submit"
    >
      {@render msg('doConfirmDelete')()}
    </Button>
    {#if triggered_from_aia}
      <Button
        class={kcClsx('kcButtonSecondaryClass')}
        id="kc-cancel"
        name="cancel-aia"
        type="submit"
      >
        {@render msg('doCancel')()}
      </Button>
    {/if}
  </ActionGroup>
</form>
