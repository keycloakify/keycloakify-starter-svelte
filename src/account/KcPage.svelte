<script lang="ts">
  import Template from '@keycloakify/svelte/account/Template.svelte';
  import type { KcContext } from 'keycloakify/account/KcContext';
  import type { ClassKey } from 'keycloakify/account/lib/kcClsx';
  import Spinner from '../Spinner.svelte';
  import { useI18n } from './i18n';
  import { OidcProvider } from './oidc';

  const { kcContext }: { kcContext: KcContext } = $props();

  const { i18n } = useI18n({ kcContext });
  const page = async () => {
    switch (kcContext.pageId) {
      case 'password.ftl':
        return import('./pages/Password.svelte');
      case 'account.ftl':
        return import('./pages/Account.svelte');
      default:
        return import('@keycloakify/svelte/account/DefaultPage.svelte');
    }
  };

  const classes = {} satisfies { [key in ClassKey]?: string };
</script>

<OidcProvider Fallback={Spinner}>
  {#await page() then { default: Page }}
    <Page
      kcContext={kcContext as never}
      {i18n}
      {classes}
      {Template}
      doUseDefaultCss={true}
    ></Page>
  {/await}
</OidcProvider>
