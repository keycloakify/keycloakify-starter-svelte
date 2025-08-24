<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcContext } from '../../KcContext.gen';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'code.ftl');

  const { msg } = useI18n();
</script>

{#snippet form()}
  <Form />
{/snippet}

<Template
  slots={{
    header: kcContext.code.success ? msg('codeSuccessTitle') : msg('codeErrorTitle', kcContext.code.error),
    form: form,
  }}
/>
