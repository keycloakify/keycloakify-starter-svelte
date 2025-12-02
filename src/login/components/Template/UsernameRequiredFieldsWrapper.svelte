<script lang="ts">
  import type { Snippet } from 'svelte';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';

  type Props = {
    slots: {
      requiredFields?: Snippet;
      username?: Snippet;
    };
  };
  const { slots }: Props = $props();
  const { kcClsx } = useKcClsx();
</script>

{#if slots.requiredFields && !slots.username}
  <div class={kcClsx('kcContentWrapperClass')}>{@render slots.requiredFields()}</div>
{:else if !slots.requiredFields && slots.username}
  {@render slots.username()}
{:else if slots.requiredFields && slots.username}
  <div class={kcClsx('kcContentWrapperClass')}>
    {@render slots.requiredFields()}
    {@render slots.username()}
  </div>
{/if}
