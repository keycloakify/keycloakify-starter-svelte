<script lang="ts">
  import type { Snippet } from 'svelte';
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  type Props = {
    className?: string;
    horizontal?: boolean;
    children: Snippet;
  };

  const { className, horizontal, children }: Props = $props();

  const { kcClsx } = useKcClsx();
</script>

<div class={clsx(kcClsx('kcFormGroupClass'), className)}>
  <div class={clsx(kcClsx('kcFormActionGroupClass'), horizontal ? 'pf-v5-u-flex-nowrap' : 'pf-v5-u-flex-wrap')}>
    {@render children()}
  </div>
</div>
