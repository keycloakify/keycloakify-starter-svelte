<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useI18n } from '../../../@keycloakify/login-ui-svelte/i18n/useI18n';
  import { useKcContext } from '../../KcContext.gen';
  import { Template } from '../../components/Template';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'link-idp-action.ftl');

  const { msg } = useI18n();
</script>

{#snippet form()}
  <Form />
{/snippet}

<Template
  displayMessage={false}
  slots={{
    header: msg('linkIdpActionTitle', kcContext.idpDisplayName),
    form: form,
  }}
/>
