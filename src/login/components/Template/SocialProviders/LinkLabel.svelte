<script lang="ts">
  import { useKcClsx } from '../../../../@keycloakify/login-ui-svelte/useKcClsx';
  import Logo from './Logo.svelte';

  const props: {
    provider: {
      alias: string;
      displayName: string;
      iconClasses?: string;
    };
  } = $props();
  const { provider } = props;

  const { kcClsx } = useKcClsx();
</script>

{#if provider.iconClasses}
  <span class={provider.iconClasses}>{provider.displayName}</span>
{:else}
  <Logo providerAlias={provider.alias} />
  <span class={kcClsx('kcFormSocialAccountNameClass')}>
    {provider.displayName}
  </span>
{/if}
