<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcContext } from '../../KcContext.gen';
  import { Template } from '../../components/Template';
  import Form from './Form.svelte';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-config-totp.ftl');

  const { msg } = useI18n();
</script>

{#snippet form()}
  <Form />
{/snippet}

<Template
  displayRequiredFields={false}
  displayMessage={!kcContext.messagesPerField.existsError('totp', 'userLabel')}
  slots={{
    header: msg('loginTotpTitle'),
    form: form,
  }}
/>
