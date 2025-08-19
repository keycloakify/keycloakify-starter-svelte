<script lang="ts">
  import { createRawSnippet } from 'svelte';
  import { assert } from 'tsafe/assert';
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useReducer } from '../../../@keycloakify/login-ui-svelte/tools/useReducer';
  import { useState } from '../../../@keycloakify/login-ui-svelte/tools/useState';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import NewPasswordField from '../../components/NewPasswordFormField.svelte';
  import TermsAcceptance from '../../components/TermsAcceptance.svelte';
  import { UserProfileFormFields } from '../../components/UserProfileFormFields';
  import { ParamsOfBeforeAfterFields } from '../../components/UserProfileFormFields/UserProfileFormFieldsProps';
  import { useI18n } from '../../i18n';
  import { REQUIRE_CONFIRM_PASSWORD } from './REQUIRE_CONFIRM_PASSWORD';
  import { useRecaptchaIfEnabled } from './useRecaptcha';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'register.ftl');
  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();

  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  const [areAllUserProfileChecksPassed, setAreAllUserProfileChecksPassed] = useState(false);
  const [areAllNewPasswordChecksPassed, setAreAllNewPasswordChecksPassed] = useState(false);
  const [hasFormBeenSubmitted, setFormSubmitted] = useReducer(() => true, false);

  const recaptcha = useRecaptchaIfEnabled({ iAmNotARobotSize: 'compact' });
  const isIAmNotARobotChecked = $derived(recaptcha?.isIAmNotARobotChecked);
</script>

<form
  id="kc-register-form"
  class={kcClsx('kcFormClass')}
  action={kcContext.url.registrationAction}
  method="post"
  onsubmit={() => setFormSubmitted()}
>
  {#snippet afterField(props: ParamsOfBeforeAfterFields)}
    {@const {
      attributeName,
      userProfileForm: { userProfileApi },
    } = props}
    {#if kcContext.passwordRequired && (attributeName === 'username' || (attributeName === 'email' && kcContext.realm.registrationEmailAsUsername))}
      <NewPasswordField
        testUserPatienceWithConfirmationLikeIts1998={REQUIRE_CONFIRM_PASSWORD}
        onAreAllCheckPassedValueChange={setAreAllNewPasswordChecksPassed}
        usecase={{
          pageId: 'register.ftl',
          userProfileApi,
        }}
      />
    {/if}
  {/snippet}
  <UserProfileFormFields
    onAreAllChecksPassedValueChange={setAreAllUserProfileChecksPassed}
    renderAfterField={afterField}
  />
  {#if kcContext.termsAcceptanceRequired}
    <TermsAcceptance
      hasError={!$areTermsAccepted && kcContext.messagesPerField.existsError('termsAccepted')}
      renderInput={(inputProps) =>
        createRawSnippet(() => ({
          render: () => `<input class="${inputProps.class}"/>`,
          setup: (element) => {
            (element as HTMLInputElement).id = inputProps.id;
            (element as HTMLInputElement).ariaInvalid = inputProps['aria-invalid'] ?? null;
            (element as HTMLInputElement).type = inputProps.type;
            (element as HTMLInputElement).checked = $areTermsAccepted;
            (element as HTMLInputElement).name = 'termsAccepted';
            (element as HTMLInputElement).onchange = (e) => setAreTermsAccepted((e.target as HTMLInputElement).checked);
          },
        }))}
    />
  {/if}

  {#if recaptcha?.iAmNotARobotPlaceholder}
    <div class="form-group">
      <div class={kcClsx('kcInputWrapperClass')}>
        {@render recaptcha.iAmNotARobotPlaceholder()}
      </div>
    </div>
  {/if}

  <div
    id="kc-form-buttons"
    class={kcClsx('kcFormButtonsClass')}
  >
    <button
      {...recaptcha?.submitButtonProps}
      class={clsx(
        kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonBlockClass', 'kcButtonLargeClass'),
        recaptcha?.submitButtonProps?.className,
      )}
      type="submit"
      id="kc-submit"
      disabled={$hasFormBeenSubmitted ||
        !$areAllUserProfileChecksPassed ||
        !$areAllNewPasswordChecksPassed ||
        (kcContext.termsAcceptanceRequired && !$areTermsAccepted) ||
        $isIAmNotARobotChecked === false}
    >
      {@render msg('doRegister')()}
    </button>
  </div>

  <div class={clsx(kcClsx('kcFormGroupClass'), 'pf-v5-c-login__main-footer-band')}>
    <div
      id="kc-form-options"
      class={clsx(kcClsx('kcFormOptionsClass'), 'pf-v5-c-login__main-footer-band-item')}
    >
      <div class={kcClsx('kcFormOptionsWrapperClass')}>
        <span>
          <a href={kcContext.url.loginUrl}>{@render msg('backToLogin')()}</a>
        </span>
      </div>
    </div>
  </div>
</form>
