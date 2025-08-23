<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'webauthn-authenticate.ftl');

  const { msg } = useI18n();
</script>

{#snippet form()}
  <Form />
{/snippet}

{#snippet info()}
  <div id="kc-registration">
    <span
      >{@render msg('noAccount')()}
      <a href={kcContext.url.registrationUrl}>{@render msg('doRegister')()}</a></span
    >
  </div>
{/snippet}

<Template
  slots={{
    header: msg('webauthn-login-title'),
    form: form,
    info: kcContext.realm.registrationAllowed && !kcContext.registrationDisabled ? info : undefined,
  }}
/>
