<script lang="ts">
  import { assert } from 'tsafe';
  import { kcSanitize } from '../../../@keycloakify/login-ui-svelte/kcSanitize';
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import LogoutOtherSessions from '../../components/LogoutOtherSessions.svelte';
  import ErrorIcon from '../../components/field/ErrorIcon.svelte';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-config-totp.ftl');

  const { msg, msgStr, advancedMsg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, totp, mode, messagesPerField, isAppInitiatedAction } = kcContext;
</script>

<ol
  id="kc-totp-settings"
  class="pf-v5-c-list pf-v5-u-mb-md"
>
  <li>
    <p>{@render msg('loginTotpStep1')()}</p>

    <ul id="kc-totp-supported-apps">
      {#each totp.supportedApplications as app (app)}
        <li>{@render advancedMsg(app)()}</li>
      {/each}
    </ul>
  </li>

  {#if mode && mode === 'manual'}
    <li>
      <p>{@render msg('loginTotpManualStep2')()}</p>
      <p>
        <span
          style="display: block;"
          id="kc-totp-secret-key">{totp.totpSecretEncoded}</span
        >
      </p>
      <p>
        <a
          href={totp.qrUrl}
          id="mode-barcode">{@render msg('loginTotpScanBarcode')()}</a
        >
      </p>
    </li>
    <li>
      <p>{@render msg('loginTotpManualStep3')()}</p>
      <ul>
        <li id="kc-totp-type">{@render msg('loginTotpType')()}: {@render msg('loginTotp.' + totp.policy.type)()}</li>
        <li id="kc-totp-algorithm">{@render msg('loginTotpAlgorithm')()}: {totp.policy.getAlgorithmKey()}</li>
        <li id="kc-totp-digits">{@render msg('loginTotpDigits')()}: {totp.policy.digits}</li>
        {#if totp.policy.type === 'totp'}
          <li id="kc-totp-period">{@render msg('loginTotpInterval')()}: {totp.policy.period}</li>
        {:else if totp.policy.type === 'hotp'}
          <li id="kc-totp-counter">{@render msg('loginTotpCounter')()}: {totp.policy.initialCounter}</li>
        {/if}
      </ul>
    </li>
  {:else}
    <li>
      <p>{@render msg('loginTotpStep2')()}</p>
      <img
        id="kc-totp-secret-qr-code"
        src="data:image/png;base64, {totp.totpSecretQrCode}"
        alt="Figure: Barcode"
      /><br />
      <p>
        <a
          href={totp.manualUrl}
          id="mode-manual">{@render msg('loginTotpUnableToScan')()}</a
        >
      </p>
    </li>
  {/if}

  <li>
    <p>{@render msg('loginTotpStep3')()}</p>
    <p>{@render msg('loginTotpStep3DeviceName')()}</p>
  </li>
</ol>

<form
  action={url.loginAction}
  class={kcClsx('kcFormClass')}
  id="kc-totp-settings-form"
  method="post"
  novalidate
>
  <div class={kcClsx('kcFormGroupClass')}>
    <div class={kcClsx('kcLabelClass')}>
      <label
        class="pf-v5-c-form__label"
        for="form-vertical-name"
      >
        <span class="pf-v5-c-form__label-text">{@render msg('authenticatorCode')()}</span>&nbsp;<span
          class="pf-v5-c-form__label-required"
          aria-hidden="true">&#42;</span
        >
      </label>
    </div>
    <div class={clsx(kcClsx('kcInputClass'), messagesPerField.existsError('totp') ? 'pf-m-error' : '')}>
      <input
        type="text"
        required
        id="totp"
        name="totp"
        autocomplete="off"
        aria-invalid={messagesPerField.existsError('totp') ? 'true' : undefined}
      />

      {#if messagesPerField.existsError('totp')}
        <ErrorIcon></ErrorIcon>
      {/if}
    </div>

    {#if messagesPerField.existsError('totp')}
      <span
        id="input-error-otp-code"
        class={kcClsx('kcInputErrorMessageClass')}
        aria-live="polite"
      >
        {@html kcSanitize(messagesPerField.get('totp'))}
      </span>
    {/if}

    <input
      type="hidden"
      id="totpSecret"
      name="totpSecret"
      value={totp.totpSecret}
    />
    {#if mode}
      <input
        type="hidden"
        id="mode"
        name="mode"
        value={mode}
      />
    {/if}
  </div>

  <div class={kcClsx('kcFormGroupClass')}>
    <div class={kcClsx('kcLabelClass')}>
      <label
        class="pf-v5-c-form__label"
        for="form-vertical-name"
      >
        <span class="pf-v5-c-form__label-text">{@render msg('loginTotpDeviceName')()}</span
        >{#if totp.otpCredentials.length >= 1}&nbsp;<span
            class="pf-v5-c-form__label-required"
            aria-hidden="true">&#42;</span
          >{/if}
      </label>
    </div>

    <div class={clsx(kcClsx('kcInputClass'), messagesPerField.existsError('userLabel') ? 'pf-m-error' : '')}>
      <input
        type="text"
        id="userLabel"
        name="userLabel"
        autocomplete="off"
        aria-invalid={messagesPerField.existsError('userLabel') ? 'true' : undefined}
      />

      {#if messagesPerField.existsError('userLabel')}
        <ErrorIcon></ErrorIcon>
      {/if}
    </div>

    {#if messagesPerField.existsError('userLabel')}
      <span
        id="input-error-otp-label"
        class={kcClsx('kcInputErrorMessageClass')}
        aria-live="polite"
      >
        {@html kcSanitize(messagesPerField.get('userLabel'))}
      </span>
    {/if}
  </div>

  <div class={kcClsx('kcFormGroupClass')}>
    <LogoutOtherSessions></LogoutOtherSessions>
  </div>

  <div class="pf-v5-c-form__group pf-m-action">
    <div class="pf-v5-c-form__actions">
      {#if isAppInitiatedAction}
        <input
          type="submit"
          class={kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonLargeClass')}
          id="saveTOTPBtn"
          value={msgStr('doSubmit')}
        />
        <button
          type="submit"
          class={kcClsx('kcButtonClass', 'kcButtonDefaultClass', 'kcButtonLargeClass', 'kcButtonLargeClass')}
          id="cancelTOTPBtn"
          name="cancel-aia"
          value="true"
          >{@render msg('doCancel')()}
        </button>
      {:else}
        <input
          type="submit"
          class={kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonBlockClass', 'kcButtonLargeClass')}
          id="saveTOTPBtn"
          value={msgStr('doSubmit')}
        />
      {/if}
    </div>
  </div>
</form>
