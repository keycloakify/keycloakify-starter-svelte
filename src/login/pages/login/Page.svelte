<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useI18n } from '../../i18n';
  import { Template } from '../../components/Template';
  import { useKcContext } from '../../KcContext.gen';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login.ftl');

  const { msg } = useI18n();
</script>

{#snippet form()}
  <Form />
{/snippet}

<Template
  slots={{
    header: msg('doLogIn'),
    form: form,
  }}
/>
