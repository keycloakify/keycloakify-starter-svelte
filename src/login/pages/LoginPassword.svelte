<script lang="ts">
  import PasswordWrapper from '@keycloakify/svelte/login/components/PasswordWrapper.svelte';
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { I18n } from '../i18n/i18n';
  import type { KcContext } from '../KcContext';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-password.ftl' }>, I18n> = $props();

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { realm, url, messagesPerField } = kcContext;

  const { msg, msgStr } = $i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError('password')}
>
  {#snippet headerNode()}
    {@render msg('doLogIn')()}
  {/snippet}

  <div id="kc-form">
    <div id="kc-form-wrapper">
      <form
        id="kc-form-login"
        onsubmit={() => {
          setIsLoginButtonDisabled(true);
          return true;
        }}
        action={url.loginAction}
        method="post"
      >
        <div class={clsx(kcClsx('kcFormGroupClass'), 'no-bottom-margin')}>
          
          <label
            for="password"
            class={kcClsx('kcLabelClass')}
          >
            {@render msg('password')()}
          </label>

          <PasswordWrapper
            {kcClsx}
            {i18n}
            passwordInputId="password"
          >
            <!-- svelte-ignore a11y_autofocus -->
            <input
              tabindex={2}
              id="password"
              class={kcClsx('kcInputClass')}
              name="password"
              type="password"
              autofocus
              autocomplete="on"
              aria-invalid={messagesPerField.existsError('username', 'password')}
            />
          </PasswordWrapper>

          {#if messagesPerField.existsError('password')}
            <span
              id="input-error-password"
              class={kcClsx('kcInputErrorMessageClass')}
              aria-live="polite">{@html kcSanitize(messagesPerField.get('password'))}</span
            >
          {/if}
        </div>

        <!-- <div class={kcClsx('kcFormGroupClass', 'kcFormSettingClass')}>
          <div id="kc-form-options"></div>
          <div class={kcClsx('kcFormOptionsWrapperClass')}>
            {#if realm.resetPasswordAllowed}
              <span>
                <a
                  tabindex={5}
                  href={url.loginResetCredentialsUrl}
                >
                  {@render msg('doForgotPassword')()}
                </a>
              </span>
            {/if}
          </div>
        </div> -->
        <div
          id="kc-form-buttons"
          class={kcClsx('kcFormGroupClass')}
        >
        <div class="flex items-center justify-between w-full">
          <input
            tabindex={4}
            class="bg-[#360940] my-4 py-3 w-1/2 text-center text-white text-base rounded-lg cursor-pointer transition-all"
            name="login"
            id="kc-login"
            type="submit"
            value={msgStr('doLogIn')}
            disabled={$isLoginButtonDisabled}
          />
          {#if realm.resetPasswordAllowed}
              <div class="w-1/2 text-right">
                <a
                  tabindex={5}
                  href={url.loginResetCredentialsUrl}
                  class="text-[#696464AB] text-base hover:text-[#360940] hover:underline transition-colors"
                >
                  {@render msg('doForgotPassword')()}
                </a>
              </div>
            {/if}
            </div>
        </div>
      </form>
    </div>
  </div>
</Template>
