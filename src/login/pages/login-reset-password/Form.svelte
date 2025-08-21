<script lang="ts">
  import { assert } from 'tsafe';
  import { kcSanitize } from '../../../@keycloakify/login-ui-svelte/kcSanitize';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import LoginButton from '../../components/buttons/LoginButton.svelte';
  import Input from '../../components/field/Input.svelte';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-reset-password.ftl');
  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, auth, messagesPerField, realm } = kcContext;
</script>

<form
  id="kc-recovery-code-login-form"
  class={kcClsx('kcFormClass')}
  action={url.loginAction}
  method="post"
>
  {#snippet input(inputProps: { type: 'text'; id: string; 'aria-invalid': 'true' | undefined })}
    <input
      type={inputProps.type}
      aria-invalid={inputProps['aria-invalid']}
      value={auth?.attemptedUsername}
      id="username"
      name="username"
      autofocus
    />
  {/snippet}
  {#snippet label()}
    {#if !realm.loginWithEmailAllowed}
      {@render msg('username')()}
    {:else if !realm.registrationEmailAsUsername}
      {@render msg('usernameOrEmail')()}
    {:else}
      {@render msg('email')()}
    {/if}
  {/snippet}
  {#snippet error()}
    {kcSanitize(messagesPerField.get('username'))}
  {/snippet}
  <Input
    renderInput={() => input}
    {label}
    error={messagesPerField.existsError('username') ? error : undefined}
  />
  <LoginButton type="submit"></LoginButton>
</form>
