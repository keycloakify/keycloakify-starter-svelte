<script lang="ts">
  import { createRawSnippet } from 'svelte';
  import { assert } from 'tsafe';
  import { kcSanitize } from '../../../@keycloakify/login-ui-svelte/kcSanitize';
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useState } from '../../../@keycloakify/login-ui-svelte/tools/useState';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import LoginButton from '../../components/buttons/LoginButton.svelte';
  import Input from '../../components/field/Input.svelte';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-otp.ftl');

  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, otpLogin, messagesPerField } = kcContext;

  let [selectedCredentialId, toggleOTP] = useState(otpLogin.selectedCredentialId || '');
</script>

<form
  id="kc-otp-login-form"
  class={kcClsx('kcFormClass')}
  action={url.loginAction}
  method="post"
>
  <input
    id="selectedCredentialId"
    type="hidden"
    name="selectedCredentialId"
    bind:value={$selectedCredentialId}
  />

  {#if otpLogin.userOtpCredentials.length > 1}
    <div class={kcClsx('kcFormGroupClass')}>
      <div class={kcClsx('kcInputWrapperClass')}>
        {#each otpLogin.userOtpCredentials as otpCredential, index (otpCredential.id)}
          <div
            id={'kc-otp-credential-' + index}
            class={clsx(
              kcClsx('kcLoginOTPListClass'),
              otpCredential.id === $selectedCredentialId ? kcClsx('kcLoginOTPListSelectedClass') : '',
            )}
            role="button"
            tabindex="0"
            onclick={() => toggleOTP(otpCredential.id)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleOTP(otpCredential.id);
                e.preventDefault();
              }
            }}
          >
            <span class={kcClsx('kcLoginOTPListItemHeaderClass')}>
              <span class={kcClsx('kcLoginOTPListItemIconBodyClass')}>
                <i
                  class={kcClsx('kcLoginOTPListItemIconClass')}
                  aria-hidden="true"
                ></i>
              </span>
              <span class={kcClsx('kcLoginOTPListItemTitleClass')}>{otpCredential.userLabel}</span>
            </span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  {#snippet error()}
    {kcSanitize(messagesPerField.get('totp'))}
  {/snippet}
  <Input
    label={msg('loginOtpOneTime')}
    renderInput={() =>
      createRawSnippet(() => ({
        render: () => {
          return `<input id="otp" name="otp" autocomplete="one-time-code" autofocus />`;
        },
      }))}
    error={messagesPerField.existsError('totp') ? error : undefined}
  />
  <LoginButton type="submit"></LoginButton>
</form>
