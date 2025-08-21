<script lang="ts">
  import type { Snippet } from 'svelte';
  import { useKcClsx } from '../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../i18n';
  import { useKcContext } from '../KcContext.gen';

  type Props = {
    hasError: boolean;
    renderInput: Snippet<
      [
        {
          type: 'checkbox';
          id: string;
          class: string;
          'aria-invalid': 'true' | undefined;
        },
      ]
    >;
  };
  const id = $props.id();
  const { hasError, renderInput }: Props = $props();

  const { kcClsx } = useKcClsx();

  const { kcContext } = useKcContext();

  const { msg } = useI18n();

  const inputId = `termsAccepted-${id}`;
</script>

<div class="form-group">
  <div class={kcClsx('kcInputWrapperClass')}>
    {@render msg('termsTitle')()}
    <div id="kc-registration-terms-text">{@render msg('termsText')()}</div>
  </div>
</div>
<div class="form-group">
  <div class={kcClsx('kcLabelWrapperClass')}>
    {@render renderInput({
      type: 'checkbox',
      id: inputId,
      class: kcClsx('kcCheckboxInputClass'),
      'aria-invalid': hasError ? 'true' : undefined,
    })}
    <input
      type="checkbox"
      id={inputId}
      name="termsAccepted"
      class={kcClsx('kcCheckboxInputClass')}
      aria-invalid={kcContext.messagesPerField.existsError('termsAccepted') ? true : undefined}
    />
    <label
      for={inputId}
      class={kcClsx('kcLabelClass')}
    >
      {@render msg('acceptTerms')()}
    </label>
  </div>
  {#if kcContext.messagesPerField.existsError('termsAccepted')}
    <div class={kcClsx('kcLabelWrapperClass')}>
      <span
        id="input-error-terms-accepted"
        class={kcClsx('kcInputErrorMessageClass')}
        aria-live="polite"
      >
        {kcContext.messagesPerField.get('termsAccepted')}
      </span>
    </div>
  {/if}
</div>
