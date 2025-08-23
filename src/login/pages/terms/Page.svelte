<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'select-authenticator.ftl');

  const { msg, advancedMsg } = useI18n();
</script>

{#snippet form()}
  <Form />
{/snippet}

<Template
  displayRequiredFields
  slots={{
    header: msg('registerTitle'),
    form: form,
  }}
/>
