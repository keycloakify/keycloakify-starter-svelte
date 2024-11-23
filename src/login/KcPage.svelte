<script lang="ts">
  import DefaultPage from '@keycloakify/svelte/login/DefaultPage.svelte';
  import Template from '@keycloakify/svelte/login/Template.svelte';
  import type { KcContext } from 'keycloakify/login/KcContext';
  import type { ClassKey } from 'keycloakify/login/lib/kcClsx';
  import type { Component } from 'svelte';
  import { getI18n } from './i18n';

  const { kcContext }: { kcContext: KcContext } = $props();

  const { i18n } = getI18n({ kcContext });
  const page = async (): Promise<{ default?: Component }> => {
    switch (kcContext.pageId) {
      default:
        return { default: undefined };
    }
  };

  const classes = {} satisfies { [key in ClassKey]?: string };
  const doMakeUserConfirmPassword = true;
</script>

{#await page() then { default: Page }}
  {#if Page}
    <Page></Page>
  {:else}
    <DefaultPage
      {kcContext}
      {i18n}
      {classes}
      {Template}
      doUseDefaultCss={true}
      {doMakeUserConfirmPassword}
    ></DefaultPage>
  {/if}
{/await}
