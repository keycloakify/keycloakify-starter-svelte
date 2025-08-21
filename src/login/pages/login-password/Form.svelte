<script lang="ts">
  import { assert } from 'tsafe';
  import { kcSanitize } from '../../../@keycloakify/login-ui-svelte/kcSanitize';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import LoginButton from '../../components/buttons/LoginButton.svelte';
  import Password from '../../components/field/Password.svelte';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-password.ftl');

  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, realm, messagesPerField } = kcContext;
</script>

<div id="kc-form">
  <div id="kc-form-wrapper">
    <form
      id="kc-form-login"
      class={kcClsx('kcFormClass')}
      action={url.loginAction}
      method="post"
    >
      {#snippet forgotPassword()}
        <a href={url.loginResetCredentialsUrl}>{@render msg('doForgotPassword')()}</a>
      {/snippet}
      {#snippet input(inputProps: { id: string; type: 'text' | 'password'; 'aria-invalid': 'true' | undefined })}
        <input
          type={inputProps.type}
          aria-invalid={inputProps['aria-invalid']}
          id="password"
          name="password"
          autofocus
          autocomplete="current-password"
        />
      {/snippet}
      {#snippet error()}
        {kcSanitize(messagesPerField.get('password'))}
      {/snippet}
      <Password
        forgotPassword={realm.resetPasswordAllowed ? forgotPassword : undefined}
        label={msg('password')}
        renderInput={() => input}
        error={messagesPerField.existsError('password') ? error : undefined}
      ></Password>

      <LoginButton type="submit"></LoginButton>
    </form>
  </div>
</div>
