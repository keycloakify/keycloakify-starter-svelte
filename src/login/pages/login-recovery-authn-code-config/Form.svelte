<script lang="ts">
  import { assert } from 'tsafe';
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useReducer } from '../../../@keycloakify/login-ui-svelte/tools/useReducer';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import LogoutOtherSessions from '../../components/LogoutOtherSessions.svelte';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-recovery-authn-code-config.ftl');

  const { msg, msgStr } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;

  const [confirmed, toggleConfirmation] = useReducer((state) => !state, false);

  /* copy recovery codes  */
  async function copyRecoveryCodes() {
    /** replacement for deprecated document.execCommand('copy') */

    const codes = parseRecoveryCodeList();
    await navigator.clipboard.writeText(codes);
  }

  /* download recovery codes  */
  function formatCurrentDateTime() {
    const dt = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    };

    return dt.toLocaleString('en-US', options);
  }

  function parseRecoveryCodeList() {
    const recoveryCodes = document.getElementById('kc-recovery-codes-list')!.getElementsByTagName('li');
    let recoveryCodeList = '';

    for (let i = 0; i < recoveryCodes.length; i++) {
      const recoveryCodeLiElement = recoveryCodes[i].innerText;

      recoveryCodeList += `${i + 1}: ${recoveryCodeLiElement}\r\n`;
    }

    return recoveryCodeList;
  }

  function buildDownloadContent() {
    const recoveryCodeList = parseRecoveryCodeList();

    return `${msgStr('recovery-codes-download-file-header')}
                
${recoveryCodeList}
${msgStr('recovery-codes-download-file-description')}
                
${msgStr('recovery-codes-download-file-date')} ${formatCurrentDateTime()};`;
  }

  function setUpDownloadLinkAndDownload(filename: string, text: string) {
    const el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    el.setAttribute('download', filename);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }

  function downloadRecoveryCodes() {
    setUpDownloadLinkAndDownload('kc-download-recovery-codes.txt', buildDownloadContent());
  }

  /* print recovery codes */
  function buildPrintContent() {
    const recoveryCodeListHTML = document.getElementById('kc-recovery-codes-list')!.parentElement!.innerHTML;
    const styles = `@page { size: auto;  margin-top: 0; }
body { width: 480px; }
div { font-family: monospace }
p:first-of-type { margin-top: 48px }`;
    const head = `<style>${styles}</style><title>kc-download-recovery-codes</title>`;
    const body = `<p>${msgStr('recovery-codes-download-file-header')}</p><div>${recoveryCodeListHTML}</div><p>${msgStr('recovery-codes-download-file-description')}</p><p>${msgStr('recovery-codes-download-file-date')}${formatCurrentDateTime()}</p>`;
    return { head, body };
  }

  function printRecoveryCodes() {
    /** replacement for discouraged window.open + document.write */

    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc) {
      console.error('Failed to access iframe document.');
      document.body.removeChild(iframe);
      return;
    }

    const { head, body } = buildPrintContent();
    iframeDoc.body.innerHTML = body;
    iframeDoc.head.innerHTML = head;

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      document.body.removeChild(iframe);
    }, 200);
  }
</script>

<!-- warning -->
<div
  class={kcClsx('kcRecoveryCodesWarning')}
  aria-label="Warning alert"
>
  <div class={kcClsx('kcAlertIconClass')}>
    <i
      class="fas fa-fw fa-bell"
      aria-hidden="true"
    ></i>
  </div>
  <h4 class={kcClsx('kcAlertTitleClass')}>
    <span class="pf-screen-reader">Warning alert:</span>
    {@render msg('recovery-code-config-warning-title')()}
  </h4>
  <div class={kcClsx('kcAlertDescriptionClass')}>
    <p>{@render msg('recovery-code-config-warning-message')()}</p>
  </div>
</div>

<div class={kcClsx('kcPanelClass')}>
  <div class={kcClsx('kcPanelMainClass')}>
    <div class={kcClsx('kcPanelMainBodyClass')}>
      <ol
        id="kc-recovery-codes-list"
        class={kcClsx('kcListClass')}
        role="list"
      >
        {#each recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList as code (code)}
          <li>{code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}</li>
        {/each}
      </ol>
    </div>
  </div>
</div>

<!-- actions -->
<div class={kcClsx('kcRecoveryCodesActions')}>
  <button
    id="printRecoveryCodes"
    class={kcClsx('kcButtonLinkClass')}
    type="button"
    onclick={printRecoveryCodes}
  >
    <i class="fas fa-print"></i>
    {@render msg('recovery-codes-print')()}
  </button>
  <button
    id="downloadRecoveryCodes"
    class={kcClsx('kcButtonLinkClass')}
    type="button"
    onclick={downloadRecoveryCodes}
  >
    <i class="fas fa-download"></i>
    {@render msg('recovery-codes-download')()}
  </button>
  <button
    id="copyRecoveryCodes"
    class={kcClsx('kcButtonLinkClass')}
    type="button"
    onclick={copyRecoveryCodes}
  >
    <i class="fas fa-copy"></i>
    {@render msg('recovery-codes-copy')()}
  </button>
</div>

<!-- confirmation checkbox -->
<div class={clsx(kcClsx('kcFormOptionsClass'), 'pf-v5-u-mt-md')}>
  <input
    class={kcClsx('kcCheckInputClass')}
    type="checkbox"
    id="kcRecoveryCodesConfirmationCheck"
    name="kcRecoveryCodesConfirmationCheck"
    onchange={() => toggleConfirmation()}
  />
  <label for="kcRecoveryCodesConfirmationCheck">{@render msg('recovery-codes-confirmation-message')()}</label>
</div>

<form
  action={url.loginAction}
  class={kcClsx('kcFormGroupClass')}
  id="kc-recovery-codes-settings-form"
  method="post"
>
  <input
    type="hidden"
    name="generatedRecoveryAuthnCodes"
    value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString}
  />
  <input
    type="hidden"
    name="generatedAt"
    value={recoveryAuthnCodesConfigBean.generatedAt}
  />
  <input
    type="hidden"
    id="userLabel"
    name="userLabel"
    value={msgStr('recovery-codes-label-default')}
  />

  <LogoutOtherSessions></LogoutOtherSessions>

  {#if isAppInitiatedAction}
    <input
      type="submit"
      class={kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonLargeClass')}
      id="saveRecoveryAuthnCodesBtn"
      value={msgStr('recovery-codes-action-complete')}
      disabled={!$confirmed}
    />
    <button
      type="submit"
      class={clsx(kcClsx('kcButtonClass', 'kcButtonDefaultClass', 'kcButtonLargeClass'), 'pf-m-link')}
      id="cancelRecoveryAuthnCodesBtn"
      name="cancel-aia"
      value="true"
    >
      {@render msg('recovery-codes-action-cancel')()}
    </button>
  {:else}
    <input
      type="submit"
      class={kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonBlockClass', 'kcButtonLargeClass')}
      id="saveRecoveryAuthnCodesBtn"
      value={msgStr('recovery-codes-action-complete')}
      disabled={!$confirmed}
    />
  {/if}
</form>
