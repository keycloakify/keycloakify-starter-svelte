<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import { Template } from '../../components/Template';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'delete-credential.ftl');

  const { msg } = useI18n();
</script>

{#snippet form()}
  <Form />
{/snippet}

<Template
  displayMessage={false}
  slots={{
    header: msg('deleteCredentialTitle', kcContext.credentialLabel),
    form: form,
  }}
/>
