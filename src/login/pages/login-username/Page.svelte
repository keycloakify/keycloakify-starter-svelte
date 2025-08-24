<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-username.ftl');

  const { msg } = useI18n();
  const { realm, social, registrationDisabled, messagesPerField, url } = kcContext;
</script>

{#snippet form()}
  <Form />
{/snippet}

{#snippet info()}
  <div id="kc-registration">
    <span>{@render msg('noAccount')()} <a href={url.registrationUrl}>{@render msg('doRegister')()}</a></span>
  </div>
{/snippet}

<Template
  displayMessage={!messagesPerField.existsError('username')}
  displaySocialProviders={!!realm.password && !!social?.providers && !!social.providers.length}
  slots={{
    header: msg('loginAccountTitle'),
    form: form,
    info: realm.password && realm.registrationAllowed && !registrationDisabled ? info : undefined,
  }}
/>
