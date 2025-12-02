<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'register.ftl');

  const { msg, advancedMsg } = useI18n();
</script>

{#snippet form()}
  <Form />
{/snippet}

<Template
  displayMessage={kcContext.messagesPerField.exists('global')}
  displayRequiredFields
  slots={{
    header: kcContext.messageHeader !== undefined ? advancedMsg(kcContext.messageHeader) : msg('registerTitle'),
    form: form,
  }}
/>
