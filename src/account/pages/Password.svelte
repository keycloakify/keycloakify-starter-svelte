<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/account/pages/PageProps';
  import { getKcClsx } from 'keycloakify/account/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';
  import { useOidc } from '../oidc';

  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    ...props
  }: PageProps<Extract<KcContext, { pageId: 'password.ftl' }>, I18n> = $props();

  const classes = {
    ...props.classes,
    kcBodyClass: clsx(props.classes?.kcBodyClass, 'password'),
  };

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });
  const { url, password, account, stateChecker } = kcContext;

  const { msg } = $i18n;

  const { goToAuthServer, backFromAuthServer } = useOidc();
</script>

<!-- check message reactivity -->
<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  active="password"
>
  <!--
    NOTE: Since we can't have the password policies we simply create a button that
    redirects to the login-update-password.ftl page of the login theme.
    See: https://github.com/user-attachments/assets/6de0f904-afa9-4ccc-b0d3-88c07f1e80d0
  -->
  <div class="row">
    <div class="col-md-10">
      <h2>{@render msg('changePasswordHtmlTitle')()}</h2>
    </div>
  </div>

  <div class="form-horizontal">
    <div class="form-group">
      <div
        id="kc-form-buttons"
        class="col-md-offset-2 col-md-10 submit"
      >
        <button
          class={kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonLargeClass')}
          onclick={() =>
            goToAuthServer({
              extraQueryParams: { kc_action: 'UPDATE_PASSWORD' },
            })}
        >
          {@render msg('changePasswordHtmlTitle')()}
        </button>
        {#if backFromAuthServer?.extraQueryParams.kc_action === 'UPDATE_PASSWORD'}
          <p>
            {#if backFromAuthServer.result.kc_action_status === 'success'}
              <span style:color="green">Password successfully updated</span>
            {:else if backFromAuthServer.result.kc_action_status === 'cancelled'}
              <span style:color="red">Password unchanged</span>
            {/if}
          </p>
        {/if}
      </div>
    </div>
  </div>
</Template>
