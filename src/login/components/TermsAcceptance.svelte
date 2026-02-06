<script lang="ts">
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import type { KcClsx } from 'keycloakify/login/lib/kcClsx';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';
  import type { Readable } from 'svelte/store';

  type TermsAcceptanceProps = {
    i18n: Readable<I18n>;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext['messagesPerField'], 'existsError' | 'get'>;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
  };
  const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange }: TermsAcceptanceProps =
    $props();

  const { msg } = $i18n;
</script>

<div class="form-group">
  <div class={kcClsx('kcInputWrapperClass')}>
    {@render msg('termsTitle')()}
    <div id="kc-registration-terms-text">{@render msg('termsText')()}</div>
  </div>
</div>
<div class="form-group">
  <div class={kcClsx('kcLabelWrapperClass')}>
    <input
      type="checkbox"
      id="termsAccepted"
      name="termsAccepted"
      class={kcClsx('kcCheckboxInputClass')}
      checked={areTermsAccepted}
      onchange={(e) => onAreTermsAcceptedValueChange(e.currentTarget.checked)}
      aria-invalid={messagesPerField.existsError('termsAccepted')}
    />
    <label
      for="termsAccepted"
      class={kcClsx('kcLabelClass')}
    >
      {@render msg('acceptTerms')()}
    </label>
  </div>
  {#if messagesPerField.existsError('termsAccepted')}
    <div class={kcClsx('kcLabelWrapperClass')}>
      <span
        id="input-error-terms-accepted"
        class={kcClsx('kcInputErrorMessageClass')}
        aria-live="polite"
      >
        {@html kcSanitize(messagesPerField.get('termsAccepted'))}
      </span>
    </div>
  {/if}
</div>
