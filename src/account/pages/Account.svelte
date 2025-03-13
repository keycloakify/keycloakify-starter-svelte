<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/account/pages/PageProps';
  import { getKcClsx } from 'keycloakify/account/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import { useI18nMessages, useUserProfile } from '../api';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';
  import { useOidc } from '../oidc';

  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    ...props
  }: PageProps<Extract<KcContext, { pageId: 'account.ftl' }>, I18n> = $props();

  const classes = {
    ...props.classes,
    kcBodyClass: clsx(props.classes?.kcBodyClass, 'user'),
  };

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { url, realm, messagesPerField, stateChecker, account, referrer } = kcContext;

  const { msg } = $i18n;

  const { goToAuthServer, backFromAuthServer } = useOidc();

  const { userProfile } = useUserProfile();
  const { i18nMessages } = useI18nMessages();

  // TODO: Improve the form validation and add custom user attributes fields using userProfile.attributes
  console.log($userProfile);
  // TODO: Use i18nResources to resolve i18n keys like ${username} to "Username"
  console.log($i18nMessages);
</script>

{#if $userProfile !== undefined && $i18nMessages !== undefined}
  <Template
    {kcContext}
    {i18n}
    {doUseDefaultCss}
    {classes}
    active="account"
  >
    <div class="row">
      <div class="col-md-10">
        <h2>{@render msg('editAccountHtmlTitle')()}</h2>
      </div>
      <div class="col-md-2 subtitle">
        <span class="subtitle">
          <span class="required">*</span>
          {@render msg('requiredFields')()}
        </span>
      </div>
    </div>

    <form
      action={url.accountUrl}
      class="form-horizontal"
      method="post"
    >
      <input
        type="hidden"
        id="stateChecker"
        name="stateChecker"
        value={stateChecker}
      />

      {#if !realm.registrationEmailAsUsername}
        <div class={clsx('form-group', messagesPerField.printIfExists('username', 'has-error'))}>
          <div class="col-sm-2 col-md-2">
            <label
              for="username"
              class="control-label"
            >
              {@render msg('username')()}
            </label>
            {#if realm.editUsernameAllowed}<span class="required">*</span>{/if}
          </div>

          <div class="col-sm-10 col-md-10">
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              disabled={!realm.editUsernameAllowed}
              value={$userProfile.username}
            />
          </div>
        </div>
      {/if}

      <div class={clsx('form-group', messagesPerField.printIfExists('email', 'has-error'))}>
        <div class="col-sm-2 col-md-2">
          <label
            for="email"
            class="control-label"
          >
            {@render msg('email')()}
          </label>{' '}
          <span class="required">*</span>
        </div>

        <div class="col-sm-10 col-md-10">
          <!-- svelte-ignore a11y_autofocus -->
          <input
            type="text"
            class="form-control"
            id="email"
            name="email"
            autofocus
            value={$userProfile.email}
          />
        </div>
      </div>

      <div class={clsx('form-group', messagesPerField.printIfExists('firstName', 'has-error'))}>
        <div class="col-sm-2 col-md-2">
          <label
            for="firstName"
            class="control-label"
          >
            {@render msg('firstName')()}
          </label>{' '}
          <span class="required">*</span>
        </div>

        <div class="col-sm-10 col-md-10">
          <input
            type="text"
            class="form-control"
            id="firstName"
            name="firstName"
            value={$userProfile.firstName}
          />
        </div>
      </div>

      <div class={clsx('form-group', messagesPerField.printIfExists('lastName', 'has-error'))}>
        <div class="col-sm-2 col-md-2">
          <label
            for="lastName"
            class="control-label"
          >
            {@render msg('lastName')()}
          </label>{' '}
          <span class="required">*</span>
        </div>

        <div class="col-sm-10 col-md-10">
          <input
            type="text"
            class="form-control"
            id="lastName"
            name="lastName"
            value={$userProfile.lastName}
          />
        </div>
      </div>

      <div class="form-group">
        <div
          id="kc-form-buttons"
          class="col-md-offset-2 col-md-10 submit"
        >
          <div>
            {#if referrer !== undefined}<a href={referrer?.url}>{@render msg('backToApplication')()}</a>{/if}
            <button
              type="submit"
              class={kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonLargeClass')}
              name="submitAction"
              value="Save"
            >
              {@render msg('doSave')()}
            </button>
            <button
              type="submit"
              class={kcClsx('kcButtonClass', 'kcButtonDefaultClass', 'kcButtonLargeClass')}
              name="submitAction"
              value="Cancel"
            >
              {@render msg('doCancel')()}
            </button>
          </div>
        </div>
      </div>
    </form>
    <br />
    <br />
    -- OR: Instead of re-implementing the form, simply redirect to the page of you account theme to enable the user to update
    their profile info --
    <br />
    {#if backFromAuthServer?.extraQueryParams.kc_action === 'UPDATE_PROFILE'}
      <p>
        {#if backFromAuthServer.result.kc_action_status === 'success'}
          <span style:color="green">Profile successfully updated</span>
        {:else if backFromAuthServer.result.kc_action_status === 'cancelled'}
          <span style:color="red">Profile unchanged</span>
        {/if}
      </p>
    {/if}
    <br />
    <button
      class={kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonLargeClass')}
      onclick={() =>
        goToAuthServer({
          extraQueryParams: { kc_action: 'UPDATE_PROFILE' },
        })}
    >
      Update profile (via Login theme)
    </button>
    <br />
    <br />
    -- Optionally add a button to enable users to delete their account (if enabled in your keycloak configuration) --
    <br />
    <br />
    <button
      class={kcClsx('kcButtonClass', 'kcButtonPrimaryClass', 'kcButtonLargeClass')}
      onclick={() =>
        goToAuthServer({
          extraQueryParams: { kc_action: 'delete_account' },
        })}
    >
      Delete Account
    </button>

    {#if kcContext.features.passwordUpdateSupported}
      <br />
      <br />
      -- You can also add a button to enable users to change their password --
      <br />
      <br />

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
    {/if}
  </Template>
{/if}
