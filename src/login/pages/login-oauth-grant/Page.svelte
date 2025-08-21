<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcContext } from '../../KcContext.gen';
  import { Template } from '../../components/Template';
  import { useI18n } from '../../i18n';
  import Form from './Form.svelte';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login-oauth-grant.ftl');

  const { msg, advancedMsgStr } = useI18n();
  const { client } = kcContext;
</script>

{#snippet header()}
  {#if client.attributes.logoUri}
    <img
      src={client.attributes.logoUri}
      alt={`${advancedMsgStr(client.name ?? client.clientId)} logo`}
    />
  {/if}
  <p>
    {#if client?.name && client.name.length > 0}
      {@render msg('oauthGrantTitle', advancedMsgStr(client.name))()}
    {:else}
      {@render msg('oauthGrantTitle', client.clientId)()}
    {/if}
  </p>
{/snippet}

{#snippet form()}
  <Form />
{/snippet}

<Template
  slots={{
    header: header,
    form: form,
  }}
/>
