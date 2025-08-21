<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-password.ftl');

  const { msg } = useI18n();
</script>

{#snippet form()}
  <Form />
{/snippet}

<Template
  displayMessage={!kcContext.messagesPerField.existsError('password')}
  slots={{
    header: msg('doLogIn'),
    form: form,
  }}
/>
