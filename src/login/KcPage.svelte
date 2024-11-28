<script lang="ts">
  import Template from '@keycloakify/svelte/login/Template.svelte';
  import UserProfileFormFields from '@keycloakify/svelte/login/components/UserProfileFormFields.svelte';
  import type { KcContext } from 'keycloakify/login/KcContext';
  import type { ClassKey } from 'keycloakify/login/lib/kcClsx';
  import type { Component } from 'svelte';
  import { useI18n } from './i18n';

  const { kcContext }: { kcContext: KcContext } = $props();

  const { i18n } = useI18n({ kcContext });

  const classes = {} satisfies { [key in ClassKey]?: string };
  const doMakeUserConfirmPassword = true;
  
  const page = async (): Promise<{ default?: Component<any> }> => {
    switch (kcContext.pageId) {
      default:
        return import('@keycloakify/svelte/login/DefaultPage.svelte');
    }
  };
</script>

{#await page() then { default: Page }}
    <Page
      {kcContext}
      i18n={i18n}
      {classes}
      {Template}
      {UserProfileFormFields}
      doUseDefaultCss={true}
      {doMakeUserConfirmPassword}
    ></Page>
{/await}
