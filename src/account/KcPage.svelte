<script lang="ts">
  import Template from '@keycloakify/svelte/account/Template.svelte';
  import type { KcContext } from 'keycloakify/account/KcContext';
  import type { ClassKey } from 'keycloakify/account/lib/kcClsx';
  import { useI18n } from './i18n';

  const { kcContext }: { kcContext: KcContext } = $props();

  const { i18n } = useI18n({ kcContext });
  const page = async () => {
    switch (kcContext.pageId) {
      default:
        return import('@keycloakify/svelte/account/DefaultPage.svelte');
    }
  };

  const classes = {} satisfies { [key in ClassKey]?: string };
</script>

{#await page() then { default: Page }}
  <Page
    {kcContext}
    {i18n}
    {classes}
    {Template}
    doUseDefaultCss={true}
  ></Page>
{/await}
