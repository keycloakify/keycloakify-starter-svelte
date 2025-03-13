<script lang="ts">
  import { OidcInitializationError, type Oidc } from 'oidc-spa';
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { OidcProviderProps } from './OidcProviderProps';
  import { oidcContextKey } from './oidc.context';
  import type { OidcSvelte } from './svelte';

  const { Fallback, ErrorFallback, children, initializeOidc }: OidcProviderProps = $props();

  const oidcOrInitializationError = writable<OidcSvelte.Context<Record<string, unknown>>>(undefined);
  setContext(oidcContextKey, oidcOrInitializationError);
  onMount(() => {
    initializeOidc.then((oidc) => {
      $oidcOrInitializationError = { oidc: oidc as Oidc<Record<string, unknown>>, fallback: Fallback };
    });
  });
</script>

{#if $oidcOrInitializationError === undefined}
  {#if Fallback}
    <Fallback />
  {/if}
{:else if $oidcOrInitializationError instanceof OidcInitializationError}
  {@const initializationError = $oidcOrInitializationError}
  {#if ErrorFallback}
    <ErrorFallback {initializationError} />
  {:else}
    <h1 style:color="red">
      An error occurred while initializing the OIDC client:&nbsp;
      {initializationError.message}
    </h1>
  {/if}
{:else}
  {@render children?.()}
{/if}
