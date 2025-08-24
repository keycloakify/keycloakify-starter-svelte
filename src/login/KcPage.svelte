<script lang="ts">
  import { I18nProvider } from '../@keycloakify/login-ui-svelte/i18n';
  import { getI18n } from './i18n';
  import type { KcContext } from './KcContext.gen';
  import { default as KcContextProvider } from './KcContext.gen.svelte';
  import PageIndex from './pages/PageIndex.gen.svelte';
  import StyleLevelCustomization from './StyleLevelCustomization.svelte';

  const { kcContext }: { kcContext: KcContext } = $props();
</script>

<KcContextProvider {kcContext}>
  <I18nProvider
    {kcContext}
    {getI18n}
  >
    <StyleLevelCustomization>
      <PageIndex />
    </StyleLevelCustomization>
  </I18nProvider>
</KcContextProvider>
