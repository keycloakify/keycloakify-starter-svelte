<script lang="ts">
  import type { Component } from 'svelte';
  import type { KcContext } from './kc.gen';

  const props: { kcContext: KcContext; Fallback?: Component } = $props();

  const KcLoginPage = import('./login/KcPage.svelte');
  const { kcContext } = props;
</script>

{#if kcContext.themeType === 'login'}
  {#await KcLoginPage}
    {#if props.Fallback}
      <props.Fallback></props.Fallback>
    {/if}
  {:then { default: KcPage }}
    <KcPage {kcContext} />
  {/await}
{:else}
  null
{/if}
