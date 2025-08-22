<script lang="ts">
  import { assert } from 'tsafe';
  import { kcSanitize } from '../../../@keycloakify/login-ui-svelte/kcSanitize';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import ConditionalUiData from '../../components/ConditionalUIData/ConditionalUIData.svelte';
  import LoginButton from '../../components/buttons/LoginButton.svelte';
  import Checkbox from '../../components/field/Checkbox.svelte';
  import Input from '../../components/field/Input.svelte';
  import Password from '../../components/field/Password.svelte';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login.ftl');
  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, realm, login, usernameHidden, enableWebAuthnConditionalUI, messagesPerField, auth } = kcContext;
</script>

<div id="kc-form">
  <div id="kc-form-wrapper">
    {#if realm.password}
      <form
        id="kc-form-login"
        class={kcClsx('kcFormClass')}
        action={url.loginAction}
        method="post"
        novalidate
      >
        {#if !usernameHidden}
          <div class={kcClsx('kcFormGroupClass')}>
            {#snippet input(inputProps: { type: 'text'; id: string; 'aria-invalid': 'true' | undefined })}
              <input
                type={inputProps.type}
                aria-invalid={inputProps['aria-invalid']}
                id={inputProps.id}
                autofocus
                autocomplete={enableWebAuthnConditionalUI ? 'username webauthn' : 'username'}
                value={login.username ?? ''}
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
              {kcSanitize(messagesPerField.getFirstError('username', 'password'))}
            {/snippet}
            <Input
              renderInput={input}
              {label}
              error={messagesPerField.existsError('username', 'password') ? error : undefined}
            />
          </div>
        {/if}
        {#snippet forgotPassword()}
          <a href={url.loginResetCredentialsUrl}>{@render msg('doForgotPassword')()}</a>
        {/snippet}
        {#snippet input(inputProps: { id: string; type: 'text' | 'password'; 'aria-invalid': 'true' | undefined })}
          <input
            type={inputProps.type}
            aria-invalid={inputProps['aria-invalid']}
            id={inputProps.id}
            name="password"
            autofocus={!!usernameHidden}
            autocomplete="current-password"
          />
        {/snippet}
        {#snippet error()}
          {kcSanitize(messagesPerField.get('password'))}
        {/snippet}
        {#snippet rememberMe()}
          {#snippet checkbox(inputProps: { className: string; type: 'checkbox'; id: string })}
            <input
              type={inputProps.type}
              id={inputProps.id}
              name="rememberMe"
              value={login.rememberMe}
              defaultChecked={!!login.rememberMe}
            />
          {/snippet}
          <Checkbox
            label={msg('rememberMe')}
            renderInput={checkbox}
          ></Checkbox>
        {/snippet}
        <Password
          forgotPassword={realm.resetPasswordAllowed ? forgotPassword : undefined}
          label={msg('password')}
          renderInput={input}
          error={messagesPerField.existsError('password') && !usernameHidden ? error : undefined}
          rememberMe={realm.rememberMe && !usernameHidden ? rememberMe : undefined}
        ></Password>

        <input
          type="hidden"
          id="id-hidden-input"
          name="credentialId"
          value={auth?.selectedCredential?.length ? auth.selectedCredential : undefined}
        />

        <LoginButton type="submit"></LoginButton>
      </form>
    {/if}
  </div>
</div>
{#if enableWebAuthnConditionalUI}
  <ConditionalUiData></ConditionalUiData>
{/if}
