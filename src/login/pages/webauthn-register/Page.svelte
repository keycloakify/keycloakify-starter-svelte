<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'webauthn-register.ftl');

  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();
</script>

{#snippet header()}
  <span class={kcClsx('kcWebAuthnKeyIcon')}></span>
  {@render msg('webauthn-registration-title')()}
{/snippet}

{#snippet form()}
  <Form />
{/snippet}

<Template
  slots={{
    header: header,
    form: form,
  }}
/>
