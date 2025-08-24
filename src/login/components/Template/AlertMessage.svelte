<script lang="ts">
  import { kcSanitize } from '../../../@keycloakify/login-ui-svelte/kcSanitize';
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';

  const { kcClsx } = useKcClsx();
  const { kcContext } = useKcContext();
</script>

<!-- App-initiated actions should not see warning messages about the need to complete the action during login. -->
{#if !(kcContext.message === undefined || (kcContext.isAppInitiatedAction && kcContext.message.type === 'warning'))}
  <div
    class={clsx(
      kcClsx('kcAlertClass'),
      `pf-m-${kcContext.message.type === 'error' ? 'danger' : kcContext.message.type}`,
      `alert-${kcContext.message.type}`,
    )}
  >
    <div class={kcClsx('kcAlertIconClass')}>
      {#if kcContext.message.type === 'success'}
        <span class={kcClsx('kcFeedbackSuccessIcon')}></span>
      {:else if kcContext.message.type === 'warning'}
        <span class={kcClsx('kcFeedbackWarningIcon')}></span>
      {:else if kcContext.message.type === 'error'}
        <span class={kcClsx('kcFeedbackErrorIcon')}></span>
      {:else if kcContext.message.type === 'info'}
        <span class={kcClsx('kcFeedbackInfoIcon')}></span>
      {/if}
    </div>
    <span class={clsx(kcClsx('kcAlertTitleClass'), 'kc-feedback-text')}>
      {@html kcSanitize(kcContext.message.summary)}
    </span>
  </div>
{/if}
