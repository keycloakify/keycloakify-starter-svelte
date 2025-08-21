<script lang="ts">
  import { assert } from 'tsafe';
  import { kcSanitize } from '../../../@keycloakify/login-ui-svelte/kcSanitize';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import LoginButton from '../../components/buttons/LoginButton.svelte';
  import Input from '../../components/field/Input.svelte';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-recovery-authn-code-input.ftl');

  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, recoveryAuthnCodesInputBean, messagesPerField } = kcContext;
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
      id="recoveryCodeInput"
      name="recoveryCodeInput"
      autofocus
    />
  {/snippet}
  {#snippet error()}
    {kcSanitize(messagesPerField.get('recoveryCodeInput'))}
  {/snippet}
  <Input
    renderInput={() => input}
    label={msg('auth-recovery-code-prompt', `${recoveryAuthnCodesInputBean.codeNumber}`)}
    error={messagesPerField.existsError('recoveryCodeInput') ? error : undefined}
  />
  <LoginButton type="submit"></LoginButton>
</form>
