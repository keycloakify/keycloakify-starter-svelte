<script lang="ts">
  import type { KcContext } from "./KcContext";
  import DefaultPage from "@keycloakify/svelte/login/DefaultPage.svelte";
  import Template from "@keycloakify/svelte/login/Template.svelte";

  const props: { kcContext: KcContext } = $props();
  import { getI18n } from "./i18n";
  import type { ClassKey } from "keycloakify/login/lib/kcClsx";
  const { kcContext } = props;

  const { i18n } = getI18n({ kcContext });
  const page = async (): Promise<any> => {
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
    >
    </DefaultPage>
  {/if}
{/await}
