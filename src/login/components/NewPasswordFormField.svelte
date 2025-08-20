<script lang="ts">
  import { createRawSnippet } from 'svelte';
  import { useNewPassword, type ParamsOfGetNewPasswordApi } from '../../@keycloakify/login-ui-svelte/useNewPassword';
  import { useI18n } from '../i18n';
  import { useKcContext } from '../KcContext.gen';
  import Password from './field/Password.svelte';
  //import { assert } from "tsafe/assert";
  const props: {
    /**
     * Whether to include the "confirm password" field when users choose a new password.
     *
     * Used with `true` to match Keycloak's standard behavior, but it is **strongly recommended to set this to `false`**
     * unless your system has no password recovery mechanism in place whatsoever.
     *
     * Rationale:
     * - Makes the form appear longer and more tedious, which may deter users from registering.
     * - Most users rely on browser password managers, which handle password entry reliably.
     * - For users typing manually, it wastes time and tests their patience.
     * - In the rare case of a typo, email-based password recovery handles it gracefully.
     *
     * Keeping this enabled only makes sense in, recovery-less environments.
     */
    testUserPatienceWithConfirmationLikeIts1998: boolean;
    usecase:
      | {
          pageId: 'register.ftl';
          userProfileApi: ParamsOfGetNewPasswordApi['userProfileApi'] | undefined;
        }
      | {
          pageId: 'login-update-password.ftl';
        };
    onAreAllCheckPassedValueChange: (areAllChecksPassed: boolean) => void;
  } = $props();
  const { usecase, testUserPatienceWithConfirmationLikeIts1998, onAreAllCheckPassedValueChange } = props;

  const i18n = useI18n();

  const { msg } = i18n;

  const { kcContext } = useKcContext();
  //assert(usecase.pageId === kcContext.pageId);

  const { formState, dispatchFormAction } = useNewPassword({
    kcContext,
    i18n,
    passwordFieldName: (() => {
      switch (usecase.pageId) {
        case 'register.ftl':
          return 'password';
        case 'login-update-password.ftl':
          return 'password-new';
      }
    })(),
    passwordConfirmFieldName: 'password-confirm',
    makeConfirmationFieldHiddenAndAutoFilled: !testUserPatienceWithConfirmationLikeIts1998,
    userProfileApi: usecase.pageId === 'register.ftl' ? usecase.userProfileApi : undefined,
  });
  const { areAllChecksPassed, formFieldStates } = $formState;

  $effect(() => {
    onAreAllCheckPassedValueChange(areAllChecksPassed);
  });
</script>

{#each formFieldStates as { attribute, displayableErrors, value } (attribute)}
  <Password
    style={attribute.annotations.inputType === 'hidden' ? `display: none` : undefined}
    required
    label={(() => {
      switch (attribute.name) {
        case 'password':
          return msg('password');
        case 'password-new':
          return msg('passwordNew');
        case 'password-confirm':
          return msg('passwordConfirm');
        default:
          return msg('');
      }
    })()}
    error={displayableErrors?.length
      ? createRawSnippet(() => ({
          render: () => {
            return displayableErrors
              .map(
                ({ errorMessageStr }, i) =>
                  `${errorMessageStr}${displayableErrors.length - 1 !== i ? '<br />' : undefined}`,
              )
              .join('');
          },
        }))
      : undefined}
    renderInput={(inputProps) =>
      createRawSnippet(() => ({
        render: () => `<input
                            name="${attribute.name}"
                            autocomplete="new-password"
                            value="${value}"
                            autofocus="${((): boolean => {
                              switch (usecase.pageId) {
                                case 'register.ftl':
                                  return false;
                                case 'login-update-password.ftl':
                                  return true;
                              }
                            })()}"
                        />`,
        setup: (element: Element) => {
          (element as HTMLInputElement).id = inputProps.id;
          (element as HTMLInputElement).ariaInvalid = inputProps['aria-invalid'] ?? null;
          (element as HTMLInputElement).type = inputProps.type;
          (element as HTMLInputElement).onchange = (event) =>
            dispatchFormAction('formAction', {
              action: 'update',
              name: attribute.name,
              value: (event.target as HTMLInputElement).value,
            });
          (element as HTMLInputElement).onblur = () =>
            dispatchFormAction('formAction', {
              action: 'focus lost',
              name: attribute.name,
            });
        },
      }))}
  />
{/each}
