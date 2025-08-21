<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcContext } from '../../KcContext.gen';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-otp.ftl');

  const { msg } = useI18n();
  const { messagesPerField } = kcContext;
</script>

{#snippet form()}
  <Form />
{/snippet}

<Template
  displayMessage={!messagesPerField.existsError('totp')}
  slots={{
    header: msg('doLogIn'),
    form: form,
  }}
/>
