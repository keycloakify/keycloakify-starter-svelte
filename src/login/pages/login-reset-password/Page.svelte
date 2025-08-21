<script lang="ts">
  import { assert } from 'tsafe';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-reset-password.ftl');

  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();
</script>

{#snippet form()}
  <Form />
{/snippet}

{#snippet info()}
  <span class={kcClsx('kcLoginMainFooterHelperText')}>
    {#if kcContext.realm.duplicateEmailsAllowed}
      {@render msg('emailInstructionUsername')()}
    {:else}
      {@render msg('emailInstruction')()}
    {/if}
  </span>
{/snippet}

<Template
  displayMessage={!kcContext.messagesPerField.existsError('username')}
  slots={{
    header: msg('emailForgotTitle'),
    form: form,
    info: info,
  }}
/>
