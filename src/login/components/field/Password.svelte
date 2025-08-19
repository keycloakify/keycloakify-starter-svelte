<script lang="ts">
  import type { Snippet } from 'svelte';
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useReducer } from '../../../@keycloakify/login-ui-svelte/tools/useReducer';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../../i18n';
  import ErrorIcon from './ErrorIcon.svelte';
  import { Group } from './Group';

  type Props = {
    className?: string;
    style?: string;
    label: Snippet;
    required?: boolean;

    error?: Snippet;
    rememberMe?: Snippet;
    forgotPassword?: Snippet;

    renderInput: (inputProps: { id: string; type: 'text' | 'password'; 'aria-invalid': 'true' | undefined }) => Snippet;
  };
  const id = $props.id();
  const { className, style, label, required = false, error, rememberMe, forgotPassword, renderInput }: Props = $props();
  const { kcClsx } = useKcClsx();

  const inputId = `password-${id}`;

  const { msgStr } = useI18n();

  const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed) => !isPasswordRevealed, false);
</script>

<Group
  {className}
  {style}
  {inputId}
  {label}
  {error}
  {required}
>
  <div class={clsx(kcClsx('kcInputGroup'), className)}>
    <div class={kcClsx('kcInputGroupItemClass', 'kcFill')}>
      <span class={kcClsx('kcInputClass', !!error && 'kcError')}>
        {@render renderInput({
          id: inputId,
          type: $isPasswordRevealed ? 'text' : 'password',
          'aria-invalid': error ? 'true' : undefined,
        })()}
        {#if !!error}
          <ErrorIcon />
        {/if}
      </span>
    </div>
    <div class={kcClsx('kcInputGroupItemClass')}>
      <button
        class={kcClsx('kcFormPasswordVisibilityButtonClass')}
        type="button"
        aria-label={msgStr($isPasswordRevealed ? 'hidePassword' : 'showPassword')}
        aria-controls={inputId}
        id={`${inputId}-show-password`}
        onclick={() => toggleIsPasswordRevealed()}
      >
        <i
          class={clsx($isPasswordRevealed ? 'fa-eye-slash' : 'fa-eye', 'fas')}
          aria-hidden="true"
        ></i>
      </button>
    </div>
  </div>
  <div
    class={kcClsx('kcFormHelperTextClass')}
    aria-live="polite"
  >
    <div class={kcClsx('kcInputHelperTextClass')}>
      {@render rememberMe?.()}
      {#if forgotPassword}
        <div class={kcClsx('kcInputHelperTextItemClass')}>
          <span class={kcClsx('kcInputHelperTextItemTextClass')}>
            {@render forgotPassword()}
          </span>
        </div>
      {/if}
    </div>
  </div>
</Group>
