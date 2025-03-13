<script lang="ts">
  import { assert } from 'oidc-spa/vendor/frontend/tsafe';
  import { getContext, onMount } from 'svelte';
  import { get, type Writable } from 'svelte/store';
  import { oidcContextKey } from './oidc.context';
  import type { OidcSvelte } from './svelte';
  import type { WithLoginEnforcedProps } from './WithLoginEnforced';

  const { params, children }: WithLoginEnforcedProps = $props();
  const context = getContext<Writable<OidcSvelte.Context<Record<string, unknown>>>>(oidcContextKey);
  const contextValue = get(context);

  assert(contextValue !== undefined);

  const { oidc, fallback: Fallback } = contextValue;

  onMount(() => {
    if (oidc.isUserLoggedIn) {
      return;
    }

    oidc.login({ doesCurrentHrefRequiresAuth: true });
  });
</script>

{#if !oidc.isUserLoggedIn}
  {#if params?.OnRedirecting === undefined}
    <Fallback></Fallback>
  {:else}
    <params.OnRedirecting />
  {/if}
{:else}
  {@render children?.()}
{/if}
