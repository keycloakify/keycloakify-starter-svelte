<script lang="ts">
  import { assert } from 'tsafe';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import ActionGroup from '../../components/buttons/ActionGroup.svelte';
  import Button from '../../components/buttons/Button.svelte';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-oauth-grant.ftl');

  const { msg, advancedMsg, advancedMsgStr } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, oauth, client } = kcContext;
</script>

<div
  id="kc-oauth"
  class="content-area"
>
  <h3>{@render msg('oauthGrantRequest')()}</h3>

  <ul class={kcClsx('kcListClass')}>
    {#if oauth.clientScopesRequested}
      {#each oauth.clientScopesRequested as clientScope (clientScope.consentScreenText)}
        <li>
          <span>
            {#if !clientScope.dynamicScopeParameter}
              {@render advancedMsg(clientScope.consentScreenText)()}
            {:else}
              {@render advancedMsg(clientScope.consentScreenText)()}: <b>{clientScope.dynamicScopeParameter}</b>
            {/if}
          </span>
        </li>
      {/each}
    {/if}
  </ul>

  {#if client.attributes.policyUri || client.attributes.tosUri}
    <h3>
      {#if client.name}
        {@render msg('oauthGrantInformation', advancedMsgStr(client.name))()}
      {:else}
        {@render msg('oauthGrantInformation', client.clientId)()}
      {/if}

      {#if client.attributes.tosUri}
        {@render msg('oauthGrantReview')()}
        <a
          href={client.attributes.tosUri}
          target="_blank">{@render msg('oauthGrantTos')()}</a
        >
      {/if}

      {#if client.attributes.policyUri}
        {@render msg('oauthGrantReview')()}
        <a
          href={client.attributes.policyUri}
          target="_blank">{@render msg('oauthGrantPolicy')()}</a
        >
      {/if}
    </h3>
  {/if}

  <form
    class={kcClsx('kcFormClass', 'kcMarginTopClass')}
    action={url.oauthAction}
    method="POST"
  >
    <input
      type="hidden"
      name="code"
      value={oauth.code}
    />

    <ActionGroup>
      <Button
        id="kc-login"
        name="accept"
        type="submit"
      >
        {@render msg('doYes')()}
      </Button>
      <Button
        id="kc-cancel"
        name="cancel"
        class={kcClsx('kcButtonSecondaryClass')}
        type="submit"
      >
        {@render msg('doNo')()}</Button
      >
    </ActionGroup>
  </form>
</div>
