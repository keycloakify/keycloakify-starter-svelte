<script lang="ts">
  import type { UserProfileFormFieldsProps } from '@keycloakify/svelte/login/components/UserProfileFormFieldsProps';
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { Component } from 'svelte';
  import type { I18n } from '../i18n/i18n';
  import type { KcContext } from '../KcContext';

  type RegisterProps = PageProps<Extract<KcContext, { pageId: 'register.ftl' }>, I18n> & {
    UserProfileFormFields: Component<UserProfileFormFieldsProps>;
    doMakeUserConfirmPassword: boolean;
  };
  const props: RegisterProps = $props();
  const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } =
    props;
  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const {
    messageHeader,
    url,
    messagesPerField,
    recaptchaRequired,
    recaptchaVisible,
    recaptchaSiteKey,
    recaptchaAction,
    termsAcceptanceRequired,
  } = kcContext;

  const { msg, msgStr, advancedMsg } = $i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  let htmlFormElement: HTMLFormElement | null = $state(null);

  $effect(() => {
    if (htmlFormElement === null) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)['onSubmitRecaptcha'] = () => {
      // @ts-expect-error; form not null
      htmlFormElement.requestSubmit();
    };

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)['onSubmitRecaptcha'];
    };
  });
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={messagesPerField.exists('global')}
  displayRequiredFields={true}
>
  {#snippet headerNode()}
    {#if messageHeader !== undefined}
      {@render advancedMsg(messageHeader)()}
    {:else}
      {@render msg('registerTitle')()}
    {/if}
  {/snippet}
  <form
    id="kc-register-form"
    class={kcClsx('kcFormClass')}
    action={url.registrationAction}
    method="post"
    bind:this={htmlFormElement}
  >
    <UserProfileFormFields
      {kcContext}
      {i18n}
      {kcClsx}
      onIsFormSubmittableValueChange={setIsFormSubmittable}
      {doMakeUserConfirmPassword}
    />
    <!-- {#if termsAcceptanceRequired}
      <TermsAcceptance
        {i18n}
        {kcClsx}
        {messagesPerField}
        areTermsAccepted={$areTermsAccepted}
        onAreTermsAcceptedValueChange={setAreTermsAccepted}
      />
    {/if} -->
    {#if recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined)}
      <div class="form-group">
        <div class={kcClsx('kcInputWrapperClass')}>
          <div
            class="g-recaptcha"
            data-size="compact"
            data-sitekey={recaptchaSiteKey}
            data-action={recaptchaAction}
          ></div>
        </div>
      </div>
    {/if}
    <div class={kcClsx('kcFormGroupClass')}>
      <div
        id="kc-form-options"
        class={kcClsx('kcFormOptionsClass')}
      >
        <div class={kcClsx('kcFormOptionsWrapperClass')}>
          <span>
            <a href={url.loginUrl}>{@render msg('backToLogin')()}</a>
          </span>
        </div>
      </div>
      {#if recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined}
        <div
          id="kc-form-buttons"
          class={kcClsx('kcFormButtonsClass')}
        >
          <button
            class={clsx(
              kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonBlockClass', 'kcButtonLargeClass'),
              'g-recaptcha',
            )}
            data-sitekey={recaptchaSiteKey}
            data-callback="onSubmitRecaptcha"
            data-action={recaptchaAction}
            type="submit"
          >
            {@render msg('doRegister')()}
          </button>
        </div>
      {:else}
        <div
          id="kc-form-buttons"
          class={kcClsx('kcFormButtonsClass')}
        >
          <input
            disabled={!$isFormSubmittable || (termsAcceptanceRequired && !$areTermsAccepted)}
            class={kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonBlockClass', 'kcButtonLargeClass')}
            type="submit"
            value={msgStr('doRegister')}
          />
        </div>
      {/if}
    </div>
  </form>
</Template>
