<script lang="ts">
  import type { Snippet } from 'svelte';
  import { readable } from 'svelte/store';
  import { assert } from 'tsafe/assert';
  import KcClsxProvider from '../@keycloakify/login-ui-svelte/KcClsxProvider.svelte';
  import { useExclusiveAppInstanceEffect } from '../@keycloakify/login-ui-svelte/tools/useExclusiveAppInstanceEffect';
  import { useStyleLevelCustomization } from './styleLevelCustomization';

  const { children }: { children: Snippet } = $props();

  const { doUseDefaultCss, classes, loadCustomStylesheet, Provider } = useStyleLevelCustomization();
  useExclusiveAppInstanceEffect({
    effectId: 'loadCustomStylesheet',
    isEnabled: readable(loadCustomStylesheet !== undefined),
    effect: () => {
      assert(loadCustomStylesheet !== undefined);
      loadCustomStylesheet();
    },
  });
</script>

<KcClsxProvider
  {doUseDefaultCss}
  {classes}
>
  {#if Provider === undefined}
    {@render children()}
  {:else}
    <Provider>{children}</Provider>
  {/if}
</KcClsxProvider>
